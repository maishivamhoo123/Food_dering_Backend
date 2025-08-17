const express = require("express");
require('dotenv').config();
const router = express.Router();
const paypal = require("@paypal/checkout-server-sdk");

// Use Railway environment variables
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

router.post("/create-order", async (req, res) => {
  try {
    const USD_AMOUNT = "1.20";
    const ITEM_NAME = "Food Order";

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [{
        amount: { currency_code: "USD", value: USD_AMOUNT },
        description: ITEM_NAME
      }],
      application_context: {
        brand_name: "Food Delivery App",
        user_action: "PAY_NOW",
        return_url: `${req.protocol}://${req.get("host")}/payment/success`,
        cancel_url: `${req.protocol}://${req.get("host")}/payment/cancel`,
        shipping_preference: "NO_SHIPPING"
      }
    });

    const order = await client.execute(request);

    res.json({
      success: true,
      orderID: order.result.id,
      approvalUrl: order.result.links.find(l => l.rel === "approve").href
    });

  } catch (err) {
    console.error("PayPal order creation error:", err);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
});

router.get("/success", (req, res) => res.send("Payment successful!"));
router.get("/cancel", (req, res) => res.send("Payment cancelled."));

module.exports = router;
