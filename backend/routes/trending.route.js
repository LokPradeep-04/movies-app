const express = require('express')
const router = express.Router()

 const {getTrendingMovies} = require('../controllers/trending.controller')
router.get('/trending',getTrendingMovies);

module.exports = router