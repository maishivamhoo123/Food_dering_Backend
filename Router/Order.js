const express = require("express");
const {
  GetPendingOrders,
  acceptOrder,
  updatePartnerLocation,
  getOrderDetails,
  createOrder,
} = require("../Controller/Order");

const route = express.Router();

// Get all pending orders
route.get("/pending", GetPendingOrders);

// Accept an order
route.post("/:id/accept", acceptOrder);
route.post("/create", createOrder);

// Update delivery partner location (live tracking)
route.post("/:id/location", updatePartnerLocation);

// Get single order details (optional)
route.get("/:id", getOrderDetails);

module.exports = route;
