import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState,setCurrentState]=useState('Sign Up')
  const {token,setToken, navigate}=useContext(ShopContext)
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  
  

  const onSubmitHandler= async (event)=>{
        event.preventDefault();
        try{
          if(currentState==='Sign Up'){
              const response=await axios.post('http://localhost:4000/api/user/register',{name,email,password})
              if(response.data.success){
                setToken(response.data.token)
                localStorage.setItem('token',response.data.token)
              }
              else{
                toast.error(response.data.message)
                console.log(err);
              }
          }

          else{
              const response=await axios.post('http://localhost:4000/api/user/login',{email,password})
              if(response.data.success){
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token)
              }
              else{
                toast.error(response.data.message)
              }
          }
         

        }catch(err){
            console.log(err);
        }
  }

  useEffect(()=>{
    if(token)
    {
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14  gap-4 text-gray-800'>
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className='prata-regular tex-3xl'>{currentState}</p>
          <hr  className='border-none h-[1.5] w-8 bg-gray-800'/>
        </div>

       {currentState ==='Login' ? '':<input required onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-2 py-2 border border-gray-800' placeholder='Name' /> } 
        <input required onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-2 py-2 border border-gray-800' placeholder='Email' />
        <input required onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-2 py-2 border border-gray-800' placeholder='Password' />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p>Forgot your password ?</p>
          {
            currentState=='Login' ?
             <p onClick={()=>setCurrentState('Sign up')} className='cursor-pointer'>Create account</p>: 
             <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
          }
          
        </div>
        <button className='bg-black text-white font-light px-8 p-2 mt-4'>{currentState==='Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
