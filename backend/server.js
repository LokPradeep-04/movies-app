const express = require('express')
const cors = require("cors")
require("dotenv").config()

const connectDB = require('./config/db')

const authRouter = require('./routes/auth.routes')
const movieRouter = require('./routes/movie.routes')
const watchlistRouter = require('./routes/watchlist.routes')
const adminRouter = require('./routes/admin.routes')
const chatRouter = require('./routes/chat.routes')
const app = express()

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/auth', authRouter)
app.use('/api/movies', movieRouter)
app.use('/api/watchlist',watchlistRouter)
app.use('/api/admin',adminRouter)
app.use('/api/chat', chatRouter) 
app.listen(3000, () => {
  console.log("Server is Running")
})