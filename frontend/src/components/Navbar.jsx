import React from 'react'
import { IoSearchCircleOutline } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import { HiUser } from "react-icons/hi";
import { MdLogin } from "react-icons/md";

import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/Logo/logo.png'


function Navbar() {
  const {currentUser,logout}={currentUser:null,logout:null}
  const cartItems=useSelector((state)=>(state.cart.cartItems))
  console.log(cartItems);
  const [isDroppedDown, setIsDroppedDown] = React.useState(false)
  console.log(isDroppedDown)
  const navigation =[
    {
      name : 'Home',
      herf: '/'
    },
    {
      name : 'Consultant',
      herf: '/consultant'
    },
    {
      name : 'Assessment',
      herf: '/assessment'
    },

    {
      name :'Devi',
      herf:'/devi'
    },
    {
      name :'Profile',
      href:'/profile'
    }

  ]
  return (
    <header className='max-w-screen-2xl mx-autopx py-2 px-4 bg-white bg-opacity-90 mx-4 rounded-full  '>
        <nav className='flex justify-between items-center   '>
        <div className='flex items-center justify-between'>
            {/* left side */}
         <Link to="/">
          <img src={logo} alt="logo" className='size-12 rounded-full'  />
         </Link>
            {
            /* Searh bar 
             <div className='flex items-center relative sm:w-72 w-40 space-x-2'>
               
            <IoSearchCircleOutline className='w-8 h-8 absolute left-2 inline-block' />
            <input type="text" placeholder='Search here' className='bg-[#EAEAEA] w-full py-2 px-8 rounded-xl focus:outline-none' />
            </div> */}
        </div>
        <div className='flex justify-evenly gap-2'>
            {/* right side  */}
            
             { !isDroppedDown&&<RiMenu2Line className='size-8 sm:hidden' onClick={()=>setIsDroppedDown(!isDroppedDown)}></RiMenu2Line>}
             {
              !isDroppedDown&&
              <div className='flex flex-col items-center gap-2 sm:flex-row sm:gap-4'> 
                  {
                
                    navigation.map((item)=>{
                      return (
                        <Link to={item.herf} key={item.name} className='text-lg font-semibold text-white bg-customBgBtn px-2 rounded-md'>{item.name}</Link>
                      )
                    })
                  }       
              </div>
             }
            



        </div>
 
    </nav>
    </header>
  )
}

export default Navbar