const express = require('express')
const cors = require("cors")
require("dotenv").config()

const connectDB = require('./config/db')

const authRouter = require('./routes/auth.routes')
const movieRouter = require('./routes/movie.routes')

const app = express()

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/auth', authRouter)
app.use('/api/movies', movieRouter)
app.listen(3000, () => {
  console.log("Server is Running")
})