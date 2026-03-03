const express = require('express')
const cors = require("cors")
require("dotenv").config();
const connectDB = require('./config/db')
const app = express()
const authRouter = require('./routes/auth.routes')
const trendingRouter = require('./routes/trending.route') 
const originalRouter = require('./routes/original.route')
const popularRouter = require('./routes/popular.route')

app.use(express.json())
app.use(cors())
connectDB();

app.use('/api/auth',authRouter)
app.use('/api/movies', trendingRouter)
app.use('/api/movies',originalRouter)
app.use('/api/movies',popularRouter)
app.listen(3000,()=>{
    console.log("Server is Running")
})


