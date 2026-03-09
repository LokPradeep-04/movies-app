const express = require("express")
const router = express.Router()
const { chat } = require("../controllers/chat.controller")
const AuthMiddleware = require("../middlewares/auth.middleware")

router.post("/", AuthMiddleware, chat)

module.exports = router