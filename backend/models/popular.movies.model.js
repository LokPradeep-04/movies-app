const mongoose = require('mongoose')

const popularSchema = new mongoose.Schema(
    {
    title: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    backdrop_path: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("PopularMovie",popularSchema)