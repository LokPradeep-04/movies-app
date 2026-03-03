const express = require('express')
const cors = require("cors")
require("dotenv").config();
const connectDB = require('./config/db')
const app = express()
const authRouter = require('./routes/auth.routes')

app.use(express.json())
app.use(cors())
connectDB();

app.use('/api/auth',authRouter)



app.listen(3000,()=>{
    console.log("Server is Running")
})


