const jwt = require("jsonwebtoken")
const User =  require("../models/user.model");

const AuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized token not provided" })
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized token missing" })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "Unauthorized User not found" })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in Auth Middleware:", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = AuthMiddleware