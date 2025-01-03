
import userModel from './../models/userModel.js';
// add product to user cart
 
const addToCart=async(req,res)=>{
    try{
        const {userId,itemId,size}=req.body;

        const userData=await userModel.findById(userId)
        const cartData=await userData.cartData;
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }


        else{
            cartData[itemId]={}
            cartData[itemId][size]=1;
            
        }

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Added to Cart"});

    }catch(err){
            console.log(err.message);
            res.json({success:false,message:err.message});
    }
}


// update user cart
const updateCart=async(req,res)=>{
    try{
        const {userId,itemId,size,quantity}=req.body;
        const userData=await userModel.findById(userId)
        const cartData=await userData.cartData;

        cartData[itemId][size]=quantity;
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Update Cart"});


    }catch(err){
        console.log(err);
        res.json({success:false,message:err.message});
    }
}


// getuser cart data

const getUserCart=async(req,res)=>{

    try{
      const {userId}=req.body;
      const userData=await userModel.findById(userId)
      const cartData=await userData.cartData;

      res.json({success:true, cartData});
     
    }catch(err){
        console.log(err);
        res.json({success:false,message:err.message});
    }
    
}

export {addToCart,updateCart,getUserCart}