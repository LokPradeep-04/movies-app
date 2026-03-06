const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup =async (req,res)=>{
 const {username,email,password} = req.body
    if(!username || !email || !password){
        return res.status(400).json({message: "Please provide the input elements"})
    }  

    const oneDocument = await User.findOne({email})
    if(oneDocument){
    return res.status(401).json({message : "user already exists"})
    }

    const hashPassword = await bcrypt.hash(password,10)

    const userData = await User.create({
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
    const existingUser = await User.findOne({email})

    if(!existingUser){
        return res.status(401).json({message : "User not exits please signup"})
    }
    const isVerified = await bcrypt.compare(password, existingUser.password)
    if(!isVerified){
        return res.status(404).json({message:"Invalid Credentails"})
    }
    else{
        const token = jwt.sign({userId: existingUser._id}, process.env.JWT_SECRET, {expiresIn : '7d'})
        res.status(200).json({message:"Login Successful", token:token})
    }
}

const profile = async (req,res)=>{
    try {
        res.status(200).json({user: req.user});
    } catch (error) {
        console.log("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports = {signup,login,profile}