const mongoose = require("mongoose");

const DeliveryPartner = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    vehicleNo: { type: String, required: true },
 address: { type: String, required: true },
currentLocation: { // updated live
    latitude: Number,
    longitude: Number
  }
});

const Partner = mongoose.model("Partner", DeliveryPartner);
module.exports = Partner;
