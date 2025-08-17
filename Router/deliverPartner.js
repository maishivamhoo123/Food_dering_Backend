const express = require("express");
const {handelSignUpDeliveryPartner , handelLoginPartner} = require("../Controller/DeliveryPartner");
const {authentication} = require("../service/auth");

const route = express.Router();
route.post("/signUpPrtner" , handelSignUpDeliveryPartner);
route.post("/loginPartner" , handelLoginPartner );
module.exports = route;