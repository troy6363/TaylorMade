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
        phone: payload.phone,
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

    if (!contactRes.ok) {
      const errText = await contactRes.text();
      throw new Error(`GHL Contact API returned status ${contactRes.status}: ${errText}`);
    }

    const contactData = await contactRes.json();
    const contactId = contactData.contact.id;

    // 2. Create Invoice in GoHighLevel
    // Map cart items directly to GHL invoice line items
    const lineItems = payload.items.map(item => ({
      name: item.name + (item.size ? ` (${item.size})` : ''),
      qty: item.quantity,
      price: item.price
    }));

    // Add shipping fee as a custom line item
    if (payload.shippingCost > 0) {
      lineItems.push({
        name: `Shipping Fee (${payload.shippingCarrier})`,
        qty: 1,
        price: payload.shippingCost
      });
    }

    const invoiceRes = await fetch('https://services.leadconnectorhq.com/invoices/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Version': '2021-04-15',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        contactId: contactId,
        items: lineItems,
        status: "draft", // Creates a draft invoice to generate the link
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Due tomorrow
      })
    });

    if (!invoiceRes.ok) {
      const errText = await invoiceRes.text();
      throw new Error(`GHL Invoice API returned status ${invoiceRes.status}: ${errText}`);
    }

    const invoiceData = await invoiceRes.json();
    const paymentUrl = invoiceData.invoice.paymentUrl;

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
