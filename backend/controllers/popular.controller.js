const PopularMovie = require('../models/popular.movies.model')

const getPopularMovies = async (req, res) => {
    try {
        const movies = await PopularMovie.find()
            .sort({ createdAt: -1 })
            .limit(20);
        res.status(200).json(movies)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {getPopularMovies}