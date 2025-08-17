const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
foodId: { type: String, required: true },
  customerName: { type: String, required: true },
  customerAddress: { type: String, required: true },
  status: { type: String, enum: ["pending", "accepted", "delivered"], default: "pending" },
  deliveryPartnerId: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPartner" },
  dropLocation: { latitude: Number, longitude: Number },
  partnerLocation: { latitude: Number, longitude: Number }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
