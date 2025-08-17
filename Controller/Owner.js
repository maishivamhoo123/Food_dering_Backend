const Owner = require("../Schema/Owner");
const {setUser} = require("../service/auth");
async function handelOwnerRegister (req , res){
 try {
        const { email, Restraurant_name, owner_name, password, restaurantId } = req.body;

        // Correctly await the query
        const existingOwner = await Owner.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ message: "Owner already exists" });
        }

        // Create a new owner
        const newOwner = new Owner({
            Restraurant_name,
            owner_name,
            email,
            password,
            restaurantId
        });

        await newOwner.save();
        res.status(201).json({ message: "Owner successfully saved", owner: newOwner });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
async function GetAllOwner(req , res){
    try{
    const Owners =  await Owner.find();
     res.status(200).json({ Owners });
  } catch (err) {
    console.error("Error fetching foods:", err);
    res.status(500).json({ msg: "Server error" });
  }
}
async function handelOwnerLogin(req, res) {
    const { email, password } = req.body;

    try {
        const existingOwner = await Owner.findOne({ email, password });

        if (!existingOwner) {
            // No user found → frontend can navigate to register page
            return res.status(404).json({ message: "User not found, please register" });
        }
         const token = setUser(existingOwner);
        // User found → frontend can navigate to home page
       return res.status(200).json({
            message: "Login successful",
            token,
            user: existingOwner
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {handelOwnerRegister , handelOwnerLogin , GetAllOwner};