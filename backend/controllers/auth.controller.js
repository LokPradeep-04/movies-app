const userSchema = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const signup =async (req,res)=>{
 const {username,email,password} = req.body
    if(!username || !email || !password){
        return res.status(400).json({message: "Please provide the input elements"})
    }  

    const oneDocument = await userSchema.findOne({email})
    if(oneDocument){
    return res.status(401).json({message : "user already exixts"})
    }

    const hashPassword = await bcrypt.hash(password,10)

    const userData = await userSchema.create({
    username,
    email,
    password: hashPassword
    })
    await userData.save()

    res.status(201).json({message : "user created"})
}

const login = async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({message: "Please provide the input elements"})
    }
    const existingUser = await userSchema.findOne({email})

    if(!existingUser){
        return res.status(401).json({message : "User not exits please signup"})
    }
    const isVerified = await bcrypt.compare(password, existingUser.password)
    if(!isVerified){
        return res.status(404).json({message:"Invalid Credentails"})
    }
    else{
        const token = jwt.sign({},"jwtToken", {expiresIn : '7d'})
        res.status(200).json({message:"Login Successful",token:token})
    }
}


module.exports = {signup,login}