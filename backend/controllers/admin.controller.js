const Movie = require('../models/movie.model')
const User = require("../models/user.model");

const getDashboardStats = async (req, res) => {
    try {
        const totalMovies = await Movie.countDocuments();
        const trending = await Movie.countDocuments({ category: "trending" });
        const popular = await Movie.countDocuments({ category: "popular" });
        const originals = await Movie.countDocuments({ category: "originals" });
        const totalUsers = await User.countDocuments();

        res.status(200).json({
            totalMovies,
            categories: { trending, popular, originals },
            totalUsers,
        });
    } catch (error) {
        console.log("Error fetching dashboard stats:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllMovies = async (req,res)=>{
    try{
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
    }catch (error) {
        console.log("Error fetching movies:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const addMovie = async (req,res)=>{
    try {
       const { title, poster_path, backdrop_path, overview,
             release_date, runtime, trailer_url, category } = req.body;
        if (!title || !poster_path || !backdrop_path || !overview || !category || !runtime||!trailer_url||!release_date) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const movie = await Movie.create({
            title, poster_path, backdrop_path, overview,
            release_date, runtime, trailer_url, category
        })
        res.status(201).json({ message: "Movie added successfully", movie });

    } catch (error) {
        console.log("Error adding movie:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateMovie = async (req,res) =>{
    try {
        const {id} = req.params;
        const movie = await Movie.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
   if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({ message: "Movie updated successfully", movie });
    } catch (error) {
        console.log("Error updating movie:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteMovie = async (req,res) =>{
    try {
        const {id} = req.params
        const movie = await Movie.findByIdAndDelete(id)
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ message: "Movie deleted successfully" });
    } 
    catch (error) {
        console.log("Error deleting movie:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getAllUsers = async (req,res)=>{
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json(users)
    } catch (error) {
        console.log("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getDashboardStats,
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    getAllUsers,
};