import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const createToken= (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user Login
const loginUser= async (req,res)=>{
        try{
            const {email,password}=req.body;
            const user=await userModel.findOne({email});
            if(!user){
                return res.json({success:false, message:"user does not exists"});
            }

            const isMatch=await bcrypt.compare(password,user.password);
            if(isMatch){
                const token=createToken(user._id);
                res.json({success:true, token});
            }
            else{
                res.json({success:false, message:"invalid Creditials"})
            }

        }catch(err){
                console.log(err);
                res.json({success:false, message:err.message})
        }
}

// Route for user Register
const registerUser= async (req,res)=>{

    try{

        const {name,email,password} =req.body;
        
        // checking user already exits or not
        const exists= await userModel.findOne({email});
        if(exists){
            return res.json({success: false,
                message:"user already exists"
            })
        }
        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message: "Please enter valid email"
            })
        }

        if(password.length < 8){
            return res.json({
                success:false,
                message: "Please enter a strong password"
            })
        }

        // use bcrypt for hashing password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)

        const newUser=new userModel ({name,email,password:hashedPassword})
        const user= await newUser.save();

        // create token
        const token= createToken(user._id)

        res.json({
            success: true,
            token
        })

    }catch(err){
            console.log(err)
            res.json({success:false, message:err.message})
    }
  
}


// route for admin login
const adminLogin=async (req,res)=>{
 try{
    const {email,password}=req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
        const token=jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success:true,token})
    }
    else{
        res.json({success:false,message:"invalid credentail"})
    }

 }catch(err){
    console.log(err);
    res.json({success:false,message:err.message})
 }
}


export {loginUser,registerUser,adminLogin}