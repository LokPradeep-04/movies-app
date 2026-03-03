const TrendingMovie = require('../models/trending.movies.model')

const getTrendingMovies = async (req,res)=>{
    try {
        const movies = await TrendingMovie.find()
       .sort({ createdAt: -1 })
       .limit(10);
       res.status(200).json(movies)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = {getTrendingMovies}