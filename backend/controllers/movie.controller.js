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

    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const similarMovies = await Movie.aggregate([
      {
        $match: {
          _id: { $ne: movie._id },
          category: movie.category
        }
      },
      { $sample: { size: 4 } },
      { $project: { title: 1, poster_path: 1, backdrop_path: 1 } }
    ]);

    const response = {
      ...movie.toObject(),
      similar_movies: similarMovies
    };

    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const searchMovies = async (req, res) => {
  try {

    const { q } = req.query

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