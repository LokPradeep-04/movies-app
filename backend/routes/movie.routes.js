const express = require("express")
const router = express.Router()

const AuthMiddleware = require('../middlewares/auth.middleware')

const {
  getMoviesByCategory,
  getMovieDetails,
  searchMovies
} = require("../controllers/movie.controller")

router.get("/", AuthMiddleware, getMoviesByCategory);
router.get("/search", AuthMiddleware, searchMovies);
router.get("/:id", AuthMiddleware, getMovieDetails);

module.exports = router