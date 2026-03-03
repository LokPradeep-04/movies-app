const OriginalMovie = require('../models/original.movies.model')

const getOriginalMovies = async (req,res)=>{
    try {
        const movies = await OriginalMovie.find()
        .sort({ createdAt: -1 })
        .limit(10);
        res.status(200).json(movies)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = {getOriginalMovies}