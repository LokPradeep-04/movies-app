const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required:true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    role:{
      type : String,
      enum : ["user","admin"],
      default:"user"
    },
    watchlist:[
      {
        movieId: String,
        title: String,
        poster_path: String,
        backdrop_path: String
      }
    ]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User