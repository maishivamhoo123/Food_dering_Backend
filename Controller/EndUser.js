const UserSchema = require("../Schema/coustmerLogin");
const jwt = require("jsonwebtoken");

async function HandelUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exist" });
    }

    // Create new user
    const newUser = new UserSchema({
      name,
      email,
      password // plain text
    });

    await newUser.save();
    res.status(200).json({ msg: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

async function HandelUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email and password
    const existingUser = await UserSchema.findOne({ email, password });

    if (!existingUser) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: existingUser._id }, "secret_key", { expiresIn: "7d" });

    res.status(200).json({ msg: "Login successful", token, user: existingUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = { HandelUserSignup, HandelUserLogin };
