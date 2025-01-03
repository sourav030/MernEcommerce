import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './../components/Title';
import axios from 'axios';

const Order = () => {
  const {token, currency}=useContext(ShopContext)
  const [orderData, setOrderData]=useState([]);

  const loadOrderData= async ()=>{
    try{
      if(!token){
        return null;
      }

      const response=await axios.post('http://localhost:4000/api/order/userorders',{},{headers:{token}})
      if(response.data.success){
        let allOrdersItem=[];
        response.data.orders.map((order)=>{
            order.items.map((item)=>{
              item['status']=order.status;
              item['payment']=order.payment;
              item['paymentMethod']=order.paymentMethod;
              item['date']=order.date
              allOrdersItem.push(item);
            })
        })
       setOrderData(allOrdersItem.reverse());
      }

    }catch(err){

    }
  }
  useEffect(()=>{
    loadOrderData()
  },[token])
  return (
    <div className='border-t pt-16'>
      
      <div className="text-2xl">
          <Title text1={'MY'} text2={'ORDERs'} />
      </div>

      <div>
        {
          orderData.map((item,index)=>(
            <div className=' py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ' key={index}> 
              <div className='flex items-start  gap-6    text-sm'>
                <img src={item.image[0]} alt="" className='w-16 sm:w-20' />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency} {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>

              <div className=" flex md:1/2 justify-center   gap-96  ">
                   <div className='flex items-center gap-2'>
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                      <p className=' text-sm text-base'>{item.status}</p>
                   </div>
                   <button onClick={loadOrderData} className='border  font-medium rounded-sm'>Track Order</button>
                </div>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Order
