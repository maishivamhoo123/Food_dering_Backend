const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  Food_Id: {
    type: String,
    required: true
  },
  Food_name: {
    type: String,
    required: true
  },
  restaurantId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String
  }
}, { timestamps: true });

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
