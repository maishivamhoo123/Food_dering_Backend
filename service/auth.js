const jwt = require("jsonwebtoken");
const secret = "Shivam@123"; 

// Create a JWT token
function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,       
            email: user.email,
            restaurantId: user.restaurantId 
        },
        secret,
        { expiresIn: "1h" }    
    );
}

// Verify a JWT token
function getUser(token) {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null; 
    }
}

module.exports = { setUser, getUser };
