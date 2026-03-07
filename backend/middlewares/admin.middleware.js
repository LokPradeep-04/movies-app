const AdminMiddleware = async (req,res,next)=>{
    try {
        if (!req.user){
            return res.status(401).json({ error: "Unauthorized - Not logged in" });
        }
        if (req.user.role!=="admin"){
            return res.status(403).json({ error: "Forbidden - Admins only" });
        }
        next();
    } catch (error) {
         console.log("Error in Admin Middleware:", error);
         res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = AdminMiddleware
