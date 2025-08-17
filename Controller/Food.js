const Food = require("../Schema/FoodSchema");

// Add new food
async function HandelAddFood(req, res) {
    try {
        const { Food_Id, Food_name, description, image, price, category } = req.body;
        const restaurantId = req.user.restaurantId; 
        const existingFood = await Food.findOne({ Food_Id, restaurantId });
        if (existingFood) {
            return res.status(400).json({ msg: "Food ID already exists" });
        }

        const newFood = new Food({
            Food_Id,           
            Food_name,
            description,
            image,
            price,
            category,
            restaurantId
        });

        await newFood.save();
        res.status(201).json({ msg: "New food saved successfully", food: newFood });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
}
async function GetAllFoods(req, res) {
  try {
    const foods = await Food.find(); // no filter → all foods
    res.status(200).json({ foods });
  } catch (err) {
    console.error("Error fetching foods:", err);
    res.status(500).json({ msg: "Server error" });
  }
}


// Get foods of logged-in owner
async function GetFoodById(req, res) {
    try {
        const restaurantId = req.user.restaurantId; // from JWT
        const foods = await Food.find({ restaurantId });
        res.status(200).json({ foods });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
}

// Update food details
async function updateFoodDetails(req, res) {
    try {
        const { foodId, Food_name, description, image, price } = req.body; // use foodId
        const restaurantId = req.user.restaurantId;

        const food = await Food.findOne({ _id: foodId, restaurantId });
        if (!food) return res.status(404).json({ msg: "Food not found" });

        if (Food_name) food.Food_name = Food_name;
        if (description) food.description = description;
        if (price) food.price = price;
        if (image) food.image = image;

        await food.save();
        res.status(200).json({ msg: "Food updated successfully", food });
    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: "Something went wrong" });
    }
}

// Delete food
async function DeleteFoodDetails(req, res) {
    try {
        const { foodId } = req.body;
        const restaurantId = req.user.restaurantId;

        const food = await Food.findOneAndDelete({ _id: foodId, restaurantId });
        if (!food) return res.status(404).json({ msg: "Food not found" });

        res.status(200).json({ msg: "Food deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: "Bad Request" });
    }
}

module.exports = { 
    HandelAddFood, 
    GetFoodById, 
    updateFoodDetails, 
    DeleteFoodDetails ,
    GetAllFoods
};
