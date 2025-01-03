import React from 'react'
import Title from './../components/Title';
import { assets } from './../assets/assets';
import NewsLetterBox from './../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Welcome to Forever, your one-stop destination for premium products at unbeatable prices!

            At Forever, we believe shopping should be more than just a transaction; it should be an experience. Whether you're exploring our latest fashion trends, discovering cutting-edge gadgets, or finding the perfect gift, we aim to make every moment special.</p>
          <p>We are a team of passionate individuals driven by the vision of creating a seamless online shopping experience for everyone. Our platform is built on trust, quality, and innovation, ensuring that every product you buy is worth every penny.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Forever is to revolutionize online shopping by delivering high-quality products, exceptional customer service, and a seamless experience that customers can trust. We are dedicated to empowering our shoppers with convenience, transparency, and innovation, ensuring every purchase brings value and joy. By prioritizing excellence and building lasting relationships, we strive to make Forever the ultimate destination for all your shopping needs.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:mpy-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>At Forever, quality is at the heart of everything we do. We are committed to providing only the best products to our customers by partnering with trusted suppliers and conducting thorough quality checks at every stage. Our team ensures that each item meets our high standards for durability, functionality, and design. If something doesn’t meet your expectations, our hassle-free return policy and responsive customer support are here to make things right. Your satisfaction and trust are our top priorities, and we continuously strive to deliver excellence in every purchase.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:mpy-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className='text-gray-600'>At Forever, we prioritize making your shopping experience as effortless and enjoyable as possible. With a user-friendly interface, easy navigation, and secure payment options, finding and purchasing your favorite products is just a few clicks away. Enjoy the flexibility of shopping anytime, anywhere, with fast delivery and a hassle-free return policy to ensure your satisfaction. Whether you're on your phone, tablet, or computer, we’re here to bring convenience to your doorstep</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:mpy-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>At Forever, our customers are at the core of everything we do. We are committed to providing exceptional support every step of the way, from answering your queries promptly to resolving any issues with care and efficiency. Our dedicated customer service team is available to assist you 24/7, ensuring your experience is smooth, satisfying, and stress-free. Your happiness is our success, and we go above and beyond to exceed your expectations every time you shop with us.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
