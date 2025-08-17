const express = require("express");
require('dotenv').config();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const { ConnectDb } = require("./connection");
const OwnerRouter = require("./Router/Owner");
const foodRouter = require("./Router/food");
const PartnerRoute = require("./Router/deliverPartner");
const OrdrRoute = require("./Router/Order");
const UserRoute = require("./Router/endUser");
const Payment = require("./Router/Payment");
const App = express();

App.use(cors({
  origin: "https://food-odering-frontend-kiom.vercel.app/", // frontend URL
  credentials: true
}));

App.use(express.json());

// Connect to MongoDB using Railway environment variable
ConnectDb(process.env.MONGO_URL);

// Mount routers
App.use("/owner", OwnerRouter);
App.use("/food", foodRouter);
App.use("/partner", PartnerRoute);
App.use("/order", OrdrRoute);
App.use("/user", UserRoute);
App.use("/payment", Payment);

// Start the server
App.listen(PORT, () => {
    console.log(`Backend is running on Port ${PORT}`);
});
