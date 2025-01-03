import React from 'react'
import { assets } from './../assets/assets';
// sm:grid grid-cols-[3fr_ifr_1fr]  md:w-2/3
const Footer = () => {
  return (
    <div>
      <div className='flex sm:grid grid-cols-[3fr_1fr_1fr]  gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className=' w-full md:w-2/3  text-gray-600 '>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat ullam aliquid quidem totam. Provident voluptatem eligendi quisquam ratione. Accusantium obcaecati maiores fugiat deserunt eum quam, sapiente id minus nemo blanditiis?
            </p>
        </div>

        <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className='flext flex-col gap-1 text-gray-600'>
                <li>HOME</li>
                <li>ABOUT us</li>
                <li>DeLivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flext flex-col gap-1 text-gray-600'>
                <li>+1-212-456-4789</li>
                <li>contact@forever.com</li>
                
            </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024@ forever.com - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
