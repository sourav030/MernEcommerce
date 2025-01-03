import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
//-------------------------Placing order using Cash on Deliviery

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            address,
            items,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder= new orderModel(orderData)
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true, message:'order Placed'})
        
    } catch (err) {
            console.log(err);
            res.json({
                success:false,
                message:err.message
            })
    }
}


//-------------------------Placing order using Strip Method----------------------------------

const placeOrderStripe = async (req, res) => {

}


//-------------------------Placing order using Razorpay--------------------------

const placeOrderRazorpay = async (req, res) => {

}

//-------------------------All order for admin pannel--------------------------

const allOrders = async (req, res) => {
        try{

            const orders=await orderModel.find({});
            res.json({success:true, orders})

        }catch(err){

        console.log(err);
        res.json({
            success:false,
            message:err.message
        })


    }
}


//-------------------------User Order--------------------------

const userOrders = async (req, res) => {
        
    try{
        const {userId}=req.body;
        const orders=await orderModel.find({userId})
        res.json({success:true,orders})
    }catch(err){

        console.log(err);
        res.json({
            success:false,
            message:err.message
        })


    }
}


//-------------------update order status-------------------

const updateStauts = async (req, res) => {

    try{
        const {orderId,status}=req.body;
        await orderModel.findByIdAndUpdate(orderId,{status});
        res.json({success:true, message:'Status updated'})

    }catch(err){
        console.log(err);

        res.json({
            success:false,
            message:err.message
        })
    }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStauts }