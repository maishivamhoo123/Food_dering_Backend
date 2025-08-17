const express = require("express");
const cors = require("cors");
const PORT = 5000;
const { ConnectDb } = require("./connection");
const OwnerRouter = require("./Router/Owner"); // ✅ import router
const foodRouter = require("./Router/food");
const PartnerRoute = require("./Router/deliverPartner");
const OrdrRoute = require("./Router/Order");
const UserRoute = require("./Router/endUser");
const Payment = require("./Router/Payment");
const App = express();

App.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

App.use(express.json());

// Connect to MongoDB

ConnectDb("mongodb+srv://maishivamhoo:VOHa6TU8r30iAmbF@foododering.qwkabrn.mongodb.net/?retryWrites=true&w=majority&appName=foodOdering");


// Use the owner router
App.use("/owner", OwnerRouter); // ✅ mount router
App.use("/food" , foodRouter);
App.use("/partner" ,PartnerRoute);
App.use("/order" ,OrdrRoute);
App.use("/user" ,UserRoute);
App.use("/payment" ,Payment);
// Start the server
App.listen(PORT, () => {
    console.log(`Backend is running on Port ${PORT}`);
});
