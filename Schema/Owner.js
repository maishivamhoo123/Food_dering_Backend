const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema({
    Restraurant_name: {
        type: String,
        required: true, 
        unique: true
    },
    owner_name: { 
        type: String,
        required: true, 
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    restaurantId: {   
        type: String,
        required: true, 

    }
});

const Owners = mongoose.model("Owners", OwnerSchema);

module.exports = Owners;
