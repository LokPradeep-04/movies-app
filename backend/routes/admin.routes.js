const express = require("express")
const router = express.Router()

const AuthMiddleware = require("../middlewares/auth.middleware")
const AdminMiddleware = require("../middlewares/admin.middleware")

const {
    getDashboardStats,
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    getAllUsers
} = require('../controllers/admin.controller')

router.get("/dashboard", AuthMiddleware, AdminMiddleware, getDashboardStats)


router.get("/movies", AuthMiddleware, AdminMiddleware, getAllMovies)
router.post("/movies", AuthMiddleware, AdminMiddleware, addMovie)
router.put("/movies/:id", AuthMiddleware, AdminMiddleware, updateMovie)
router.delete("/movies/:id", AuthMiddleware, AdminMiddleware, deleteMovie)


router.get("/users", AuthMiddleware, AdminMiddleware, getAllUsers)

module.exports = router

