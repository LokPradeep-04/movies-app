const User = require("../models/user.model");

const addToWatchlist = async (req,res)=>{
  try{

    const {movieId,title,poster_path,backdrop_path} = req.body

    const user = await User.findById(req.user.id)
       const alreadyExists = user.watchlist.some(
      (movie) => movie.movieId === movieId
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    user.watchlist.push({
      movieId,
      title,
      poster_path,
      backdrop_path
    })

    await user.save()

    res.json({message:"Movie added to watchlist"})

  }catch(err){
    res.status(500).json({message:"Server error"})
  }
}

const getWatchlist = async (req,res)=>{
  try{

    const user = await User.findById(req.user.id)

    res.json(user.watchlist)

  }catch(err){
    res.status(500).json({message:"Server error"})
  }
}

const removeFromWatchlist = async (req,res)=>{
  try {
    const {movieId} = req.params;
    const user = await User.findById(req.user.id)

    user.watchlist = user.watchlist.filter(
      (movie) => movie.movieId !== movieId
    )
    await user.save();
    res.json({ message: "Movie removed from watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {addToWatchlist,getWatchlist,removeFromWatchlist}