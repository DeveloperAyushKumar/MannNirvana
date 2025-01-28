import React from 'react'
import footer_book from "../assets/footer-book.png"
import { FaFacebook,FaTwitter,  FaInstagram } from 'react-icons/fa'
function Footer() {
  return (

    <footer className='bg-gray-900 text-white py-10 px-4 '>
        {/* top section */}
        <div className='flex '>
            {/* left side */}
            <div className='w-1/2 flex flex-col items-center gap-4'>
                <img src={footer_book} alt="Logo" className='size-20' />
                <ul className='flex gap-4'>
                    <li>Home</li>
                    <li>Services</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            {/* right side */}
            <div className='w-1/2 '>
                <p className='font-semibold mb-4'>Subscribe to our newsletter to receive the latest updates, news, and offers! </p>
                <div>
                    <input 
                    type='email'
                    placeholder='Enter your email address'
                    className='border text-black font-semibold bg-gray-100 rounded-lg px-4 py-1 focus:outline-none'
                    />
                    <button className='bg-primary py-1 px-4 rounded-lg ml-2 font-semibold'>Subscribe</button>
                </div>
            </div>

        </div>
        {/* bottom section */}
        <div className='flex items-end mt-6 '>
            {/* left side  */}
            <div className='w-1/2'>

            <ul className='flex items-center justify-evenly '>
                <li><a>Privay Policy</a></li>
                <li><a>Terms of Service</a></li>
            </ul>
        </div>
        
        {/* right side */}
        <div className='w-1/2'>
            <ul className='flex gap-4 '>
                <a> <FaFacebook className='size-8'></FaFacebook></a>
                <a> <FaTwitter className='size-8'></FaTwitter></a>
                <a> <FaInstagram className='size-8'></FaInstagram></a>
            </ul>
        </div>

            </div>
    </footer>
  )
}

export default Footer