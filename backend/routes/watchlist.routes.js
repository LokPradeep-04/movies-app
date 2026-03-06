const express = require("express")
const router = express.Router()

const { addToWatchlist, getWatchlist } = require("../controllers/watchlist.controller")

const AuthMiddleware = require('../middlewares/auth.middleware')

router.post("/", AuthMiddleware, addToWatchlist)

router.get("/", AuthMiddleware, getWatchlist)

module.exports = router