const Movie = require("../models/movie.model")

const getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.query
    const movies = await Movie.find({ category })
    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id)
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" })
    }
    res.status(200).json(movie)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const searchMovies = async (req,res)=>{
  try {
    const {q} = req.query
    const movies = await Movie.find({
      title: { $regex: q, $options: "i" }
    })
    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = {
  getMoviesByCategory,
  getMovieDetails,
  searchMovies
}