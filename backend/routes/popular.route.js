const express = require('express')
const router = express.Router()
const {getPopularMovies} = require('../controllers/popular.controller')

router.get('/popular',getPopularMovies)

module.exports = router