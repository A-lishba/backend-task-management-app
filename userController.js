const User= require("../model/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt= require ("jsonwebtoken");
const registerUser=async (req,res)=> {
try {
    const {
    firstName,
    lastName,
    email,
    phone,
    password,   
} = req.body;
const existingUser= await User.findOne({ $or : [{email},{phone}]});
if (existingUser) {
    return res.status(400).json({message: "Email or Phone already in use"})
};
const hashedPassword = await bcrypt.hash(password,10);
const newUser=new User({
   firstName,
    lastName,
    email,
    phone,
    password:hashedPassword,
   
})
await newUser.save();
res.status(201).json({message:"User Registered Succesfully"});
} catch (error){
    console.error("Regsiteration error", error);
    res.status(500).json({message:"Server error during registeration", error: error.message});
}
};
const login = async(req,res) => {
    try {
        const {
            email,password
        }= req.body;
        const existing=await User.findOne({email});
        if (!existing){
            console.log("Email not found");
            return res.status(409).json({message: "Email not found"});
        }
        const isUser= await bcrypt.compare (password, existing.password);
        if(!isUser){
            return res.status(409).json({message:"Invalid password"});
        }
    const token=jwt.sign({email:existing.email, id:existing._id}, process.env.JWT_SECRET);
    console.log("Login token, ", token);
    res.status(200).json({
        message: "Login succesfull",
        data: {token},
    })
    }catch (er){
   console.log("Login failed : ", er);
   res.status(500).json({
    message: "Login failed , Server error",
    error: er.message,
})
    }
};
module.exports = {registerUser,login}