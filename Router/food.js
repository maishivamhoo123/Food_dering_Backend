const express = require("express");
const {HandelAddFood , GetFoodById ,updateFoodDetails, DeleteFoodDetails  ,GetAllFoods } = require("../Controller/Food"); 
const authMiddleware = require("../service/foodMiddleware");
const route = express.Router();

route.post("/addFood" , authMiddleware , HandelAddFood);
route.post("/getFoods" , authMiddleware , GetFoodById);
route.put("/updateFood" , authMiddleware , updateFoodDetails);
route.delete("/deleteFood" , authMiddleware , DeleteFoodDetails );


route.get("/getAllFood" ,GetAllFoods );

module.exports = route;