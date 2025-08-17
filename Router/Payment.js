const express = require("express");
const router = express.Router();
const paypal = require("@paypal/checkout-server-sdk");

// PayPal sandbox credentials
const environment = new paypal.core.SandboxEnvironment(
  "ASr9vc6-Yl5MgUyrfA5LzpxC5sbQJZrrywgoA7Uc-KKcMZKlqN0l49jOteMRp56h4j4gyVn-PFIC8C_h",
  "EGd9XPQTE9ohFx_BaEuyvwofj4F1Du5RyqqzaKziQ6tiZijFJtBUR0Fs4VHOB1WrlfiSsywCeon9u820"
);
const client = new paypal.core.PayPalHttpClient(environment);

// Create order with fixed amount in USD
router.post("/create-order", async (req, res) => {
  try {
    const USD_AMOUNT = "1.20"; // fixed amount in USD
    const ITEM_NAME = "Food Order";

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: USD_AMOUNT
        },
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

// Success callback
router.get("/success", (req, res) => {
  res.send("Payment successful!");
});

// Cancel callback
router.get("/cancel", (req, res) => {
  res.send("Payment cancelled.");
});

module.exports = router;
