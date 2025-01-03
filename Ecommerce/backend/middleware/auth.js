import jwt from 'jsonwebtoken';


const authuser= async (req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:'Not authorized login Again'})
    }
    try{
        const token_decode= jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId=token_decode.id
        next();
    }
    catch (err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

export default authuser