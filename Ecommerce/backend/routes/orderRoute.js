import express from 'express'

import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStauts} from '../controllers/orderController.js'
import adminAuth from './../middleware/adminAuth.js';
import authuser from './../middleware/auth.js';

const orderRouter=express.Router();
// addmin for
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStauts);

// Payment feature

orderRouter.post('/place',authuser,placeOrder)
orderRouter.post('/stripe',authuser,placeOrderStripe)
orderRouter.post('/razorpay',authuser,placeOrderRazorpay)

// userfeature

orderRouter.post('/userorders',authuser,userOrders);

export default orderRouter