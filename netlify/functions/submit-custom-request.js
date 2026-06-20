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
    const ghlWebhookUrl = (process.env.GHL_WEBHOOK_URL || '').trim();

    if (!ghlWebhookUrl) {
      console.warn("GHL_WEBHOOK_URL environment variable is not set.");
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: "Form submission processed, but GHL Webhook is not configured in environment variables." 
        })
      };
    }

    // Forward the custom request data to GoHighLevel
    const ghlResponse = await fetch(ghlWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: "custom_order_request",
        ...payload
      })
    });

    if (!ghlResponse.ok) {
      const errText = await ghlResponse.text();
      throw new Error(`GHL Webhook returned status ${ghlResponse.status}: ${errText}`);
    }

    console.log("Successfully forwarded custom request to GoHighLevel.");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error("GHL webhook dispatch error:", error.message);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        error: "Failed to forward custom request to GoHighLevel", 
        details: error.message 
      })
    };
  }
};
