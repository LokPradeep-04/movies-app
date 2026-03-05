const express = require('express')

const AuthMiddleware = require('../middlewares/auth.middleware')
const {signup,login, profile} = require('../controllers/auth.controller')

const router = express.Router();

router.post('/signup',signup)

router.post('/login',login)

router.get('/profile', AuthMiddleware, profile)

module.exports = router;