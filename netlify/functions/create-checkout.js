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
    const accessToken = (process.env.SQUARE_ACCESS_TOKEN || '').trim();
    
    // Read strictly from environment variable to satisfy Netlify scanner
    const locationId = (process.env.SQUARE_LOCATION_ID || '').trim();

    console.log("Debug Square Vars - Access Token Exists:", !!accessToken, "Location ID Exists:", !!locationId);

    if (!accessToken || !locationId) {
      console.error("Square credentials missing from environment.");
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Checkout configuration error. Square credentials are not set." })
      };
    }

    // Prepare Square Line Items from payload cart items
    const lineItems = payload.items.map(item => {
      // Apply $20 surcharge for 2XL and 3XL sizes on any clothing item
      const sizeUpper = (item.size || '').toUpperCase();
      const surcharge = (sizeUpper === '2XL' || sizeUpper === '3XL') ? 2000 : 0; // Square uses cents
      
      const basePriceInCents = Math.round(Number(item.price) * 100);
      const unitPriceInCents = basePriceInCents + surcharge;
      
      const itemName = item.name + (item.size ? ` (${item.size})` : '') + (item.team ? ` - ${item.team}` : '');

      return {
        name: itemName,
        quantity: String(item.quantity),
        base_price_money: {
          amount: unitPriceInCents,
          currency: "USD"
        }
      };
    });

    // Add shipping cost if applicable
    if (payload.shippingCost > 0) {
      lineItems.push({
        name: `Shipping Fee (${payload.shippingCarrier.toUpperCase()})`,
        quantity: "1",
        base_price_money: {
          amount: Math.round(payload.shippingCost * 100), // cents
          currency: "USD"
        }
      });
    }

    // Call Square Checkout API (v2) to generate a payment link

    const squareResponse = await fetch('https://connect.squareup.com/v2/online-checkout/payment-links', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Square-Version': '2023-12-13'
      },
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
        checkout_options: {
          allow_tipping: false,
          redirect_url: `https://${event.headers.host || 'taylormade-accessories.com'}/thanks`,
          merchant_support_email: "info@taylormade-accessories.com",
          ask_for_shipping_address: false
        },
        order: {
          location_id: locationId,
          line_items: lineItems,
          customer_reference_id: payload.email || "",
          metadata: {
            customer_phone: formatE164(payload.phone) || ""
          }
        },
        pre_populated_data: {
          buyer_email: payload.email,
          buyer_phone_number: formatE164(payload.phone),
          buyer_address: {
            address_line_1: payload.shippingAddress?.address || "",
            locality: payload.shippingAddress?.city || "",
            administrative_district_level_1: payload.shippingAddress?.state || "",
            postal_code: payload.shippingAddress?.zip || "",
            country: "US",
            phone_number: formatE164(payload.phone) || ""
          }
        }
      })
    });

    if (!squareResponse.ok) {
      const errText = await squareResponse.text();
      throw new Error(`Square API returned status ${squareResponse.status}: ${errText}`);
    }

    const squareData = await squareResponse.json();
    const paymentUrl = squareData.paymentLink?.url || squareData.payment_link?.url;

    if (!paymentUrl) {
      throw new Error(`Square response did not contain a checkout URL. Response: ${JSON.stringify(squareData)}`);
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentUrl: paymentUrl })
    };

  } catch (error) {
    console.error("Square checkout generation error:", error.message);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        error: "Failed to generate Square checkout link", 
        details: error.message 
      })
    };
  }
};
