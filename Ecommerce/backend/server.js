import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

//app confir
const app=express();
const port=process.env.PROT || 4000
connectDb()
connectCloudinary();

// middlewares
app.use(express.json()) 
app.use(cors());

//api endponts
app.use('/api/user',userRouter);
// http://localhost:4000/api/user/register
app.use('/api/product',productRouter)
// http://localhost:4000/api/product/add
app.use('/api/cart',cartRouter)

app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send('Api Working')
})

app.listen(port,()=>{
    console.log(`app is running on ${port}`)
})