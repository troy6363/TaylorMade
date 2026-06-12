function formatE164(phone) {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }
  if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+${cleaned}`;
  }
  if (cleaned.length > 0) {
    return `+${cleaned}`;
  }
  return "";
}

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    const payload = JSON.parse(event.body);
    const accessToken = process.env.GHL_ACCESS_TOKEN;

    // FALLBACK FOR TESTING:
    // If no GoHighLevel Access Token environment variable is set up in Netlify,
    // return a mock payment redirect URL so you can test the transition.
    if (!accessToken) {
      console.log("GHL_ACCESS_TOKEN not found. Returning mock Square Sandbox payment link.");
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentUrl: "https://checkout.squareupsandbox.com/mock-ghl-payment-link"
        })
      };
    }

    // 1. Create or Update Contact in GoHighLevel (API v2)
    const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Version': '2021-04-15',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: formatE164(payload.phone),
        locationId: process.env.GHL_LOCATION_ID,
        address1: payload.shippingAddress.address || "",
        city: payload.shippingAddress.city || "",
        state: payload.shippingAddress.state || "",
        postalCode: payload.shippingAddress.zip || "",
        country: "US",
        customFields: [
          { key: "shipping_carrier", value: payload.shippingCarrier },
          { key: "shipping_cost", value: payload.shippingCost }
        ]
      })
    });

    let contactId;
    if (!contactRes.ok) {
      const errText = await contactRes.text();
      let errJson;
      try {
        errJson = JSON.parse(errText);
      } catch (e) {}

      // If GHL blocks duplicate contacts, extract the existing contact ID from the metadata and proceed
      if (contactRes.status === 400 && errJson && errJson.meta && errJson.meta.contactId) {
        console.log("Contact already exists. Using existing Contact ID:", errJson.meta.contactId);
        contactId = errJson.meta.contactId;
      } else {
        throw new Error(`GHL Contact API returned status ${contactRes.status}: ${errText}`);
      }
    } else {
      const contactData = await contactRes.json();
      contactId = contactData.contact.id;
    }

    // 2. Create Invoice in GoHighLevel
    // Map cart items directly to GHL invoice line items
    const lineItems = payload.items.map(item => ({
      name: item.name + (item.size ? ` (${item.size})` : ''),
      qty: item.quantity,
      amount: item.price,
      currency: "USD"
    }));

    // Add shipping fee as a custom line item
    if (payload.shippingCost > 0) {
      lineItems.push({
        name: `Shipping Fee (${payload.shippingCarrier})`,
        qty: 1,
        amount: payload.shippingCost,
        currency: "USD"
      });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const tomorrowStr = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const invoiceRes = await fetch('https://services.leadconnectorhq.com/invoices/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Version': '2021-04-15',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        altId: process.env.GHL_LOCATION_ID,
        altType: "location",
        name: `Website Order - ${payload.firstName} ${payload.lastName}`,
        currency: "USD",
        issueDate: todayStr,
        dueDate: tomorrowStr,
        businessDetails: {
          name: "Taylor Made Accessories"
        },
        contactDetails: {
          id: contactId,
          name: `${payload.firstName} ${payload.lastName}`,
          email: payload.email,
          phoneNo: formatE164(payload.phone)
        },
        items: lineItems,
        status: "sent"
      })
    });

    if (!invoiceRes.ok) {
      const errText = await invoiceRes.text();
      throw new Error(`GHL Invoice API returned status ${invoiceRes.status}: ${errText}`);
    }

    const invoiceData = await invoiceRes.json();
    console.log("Full Invoice API Response:", JSON.stringify(invoiceData));

    // The GoHighLevel API doesn't return the payment URL directly for invoices.
    // However, all hosted invoices are available at a predictable URL using the invoice _id.
    const invoiceId = invoiceData.invoice?._id || invoiceData._id;
    
    if (!invoiceId) {
      throw new Error(`Invoice created but no ID found in response. Response: ${JSON.stringify(invoiceData)}`);
    }

    // Because GoHighLevel forces new invoices to be created as "draft", the public link will return a 404
    // until the invoice is formally "sent". We trigger the send endpoint here to finalize it.
    try {
      const sendRes = await fetch(`https://services.leadconnectorhq.com/invoices/${invoiceId}/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Version': '2021-04-15',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          altId: process.env.GHL_LOCATION_ID,
          altType: "location",
          action: "email",
          liveMode: true
        })
      });
      
      if (!sendRes.ok) {
        const errText = await sendRes.text();
        console.error(`Failed to send/finalize invoice ${invoiceId}. Link may 404. Status ${sendRes.status}: ${errText}`);
      } else {
        console.log(`Successfully finalized invoice ${invoiceId}`);
      }
    } catch (e) {
      console.error("Error calling send invoice endpoint:", e.message);
    }

    const paymentUrl = `https://api.leadconnectorhq.com/widget/invoice/${invoiceId}`;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentUrl: paymentUrl })
    };

  } catch (error) {
    console.error("GHL redirect bridging error:", error.message);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        error: "Failed to generate GHL checkout link", 
        details: error.message 
      })
    };
  }
};
