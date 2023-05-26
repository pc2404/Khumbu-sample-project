import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register------
export const register=async(req, res)=>{
    try {
        
        const {firstName, lastName, email, dob, password}= req.body;
    
        const salt=await bcrypt.genSalt();
        const hashPassword=await bcrypt.hash(password, salt);
    
        const newUser=new User({
            firstName,
            lastName,
            email,
            dob,
            password:hashPassword
        })
    
        const savedUser=await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({error: error.message, msg:"failed"});
    }
}

// Login----

export const login=async(req, res)=>{
    try {
        
        const {email, password}=req.body;
        
        const user=await User.findOne({email:email});
        if(!user) return res.status(400).json({msg:"User does not exist"});
    
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});
        
        const token=jwt.sign({id:user._id, firstName:user.first}, process.env.JWT_SECRET);
        delete user.password;
        
        res.status(200).json({token, user});
    } catch (error) {
        res.status(500).json({error: error.message});
        
    }

}
