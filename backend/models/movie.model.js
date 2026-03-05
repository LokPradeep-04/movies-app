const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  poster_path: {
    type: String,
    required: true
  },

  backdrop_path: {
    type: String,
    required: true
  },

  overview: {
    type: String,
    required: true
  },

  release_date: {
    type: String
  },

  runtime: {
    type: String
  },

  trailer_url: {
    type: String
  },

  category: {
    type: String,
    enum: ["trending", "popular", "originals"],
    required: true
  },

  similar_movies: {
    type: Array,
    default: []
  }

},
{ timestamps: true }
)

module.exports = mongoose.model("Movie", movieSchema)