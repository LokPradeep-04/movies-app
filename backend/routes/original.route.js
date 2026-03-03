const express = require('express')
const router = express.Router()
const {getOriginalMovies} = require('../controllers/original.controller')
router.get('/originals',getOriginalMovies)

module.exports = router