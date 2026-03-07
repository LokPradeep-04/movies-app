const express = require("express")
const router = express.Router()

const { addToWatchlist, getWatchlist,removeFromWatchlist } = require("../controllers/watchlist.controller")

const AuthMiddleware = require('../middlewares/auth.middleware')

router.post("/", AuthMiddleware, addToWatchlist)

router.get("/", AuthMiddleware, getWatchlist)

router.delete('/:movieId',AuthMiddleware,removeFromWatchlist)

module.exports = router