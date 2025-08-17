const e = require("express");
const DeliveryPartnerSchema = require("../Schema/DeliveryPartner");
const {setUser} = require("../service/auth");

async function handelSignUpDeliveryPartner(req, res) {
    try {
        const { name, email, password, vehicleNo, address } = req.body;

        // Check if partner already exists
        const existingPartner = await DeliveryPartnerSchema.findOne({ email });
        if (existingPartner) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Create new partner
        const newPartner = new DeliveryPartnerSchema({
            name,
            email,
            password,
            vehicleNo,
            address
        });

        await newPartner.save();
        res.status(200).json({ msg: "Created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Some problem occurred" });
    }
}
async function handelLoginPartner(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email and password
        const existingUser = await DeliveryPartnerSchema.findOne({ email, password });
        if (!existingUser) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        // Generate token
        const token = setUser(existingUser);

        res.status(200).json({ msg: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Some problem occurred" });
    }
}
module.exports = { handelSignUpDeliveryPartner  , handelLoginPartner};
