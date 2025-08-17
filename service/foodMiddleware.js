// middleware/auth.js
const { getUser } = require("./auth"); // your JWT helper

function authMiddleware(req, res, next) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    const decoded = getUser(token);
    if (!decoded) return res.status(401).json({ msg: "Invalid token" });

    req.user = decoded;
    next();
}

module.exports = authMiddleware;
