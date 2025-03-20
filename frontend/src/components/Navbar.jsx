import React from 'react'
import { IoSearchCircleOutline } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import { HiUser } from "react-icons/hi";
import { MdLogin } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useWalletContext } from '../context/WalletContext';
import logo from '../assets/Logo/logo.png'
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { motion } from "motion/react";
import { Dropdown } from 'antd';
function Navbar() {
  const { user,isConnected } = useWalletContext();
  const {currentUser,logout}={currentUser:null,logout:null}
  const cartItems=useSelector((state)=>(state.cart.cartItems))
  console.log(cartItems);
  const [isDroppedDown, setIsDroppedDown] = React.useState(false)
  console.log(isDroppedDown)
  const navigation =[
    {
      name : 'Home',
      href: '/'
    },
    {
      name : 'Consultant',
      href: '/consultant'
    },
    {
      name :'Devi',
      href:'/devi'
    },
    {
      name: 'Reflect',
      href: '/track-your-emotion'
    },
    {
      name: 'Your Dost', 
      href:'/your-dost'
    },
    {
      name: 'Join',
      href:'/ngo'
    },
    {
      name :'Profile',
      href:'/profile'
    }
  ]
  return (
    <header id="header" className='max-w-screen-2xl mx-autopx py-2 px-4 bg-light mx-4 rounded-full mt-6  '>
        <nav className='flex justify-between items-center   '>
        <div className='flex items-center justify-between px-2'>
            {/* left side */}
         <Link to="/">
          <img src={logo} alt="logo" className='size-12 rounded-full'  />
         </Link>
         <div className='font-extrabold px-4'>
         MannNirvana
         </div>
        
            {
            /* Searh bar 
             <div className='flex items-center relative sm:w-72 w-40 space-x-2'>
               
            <IoSearchCircleOutline className='w-8 h-8 absolute left-2 inline-block' />
            <input type="text" placeholder='Search here' className='bg-[#EAEAEA] w-full py-2 px-8 rounded-xl focus:outline-none' />
            </div> */}
        </div>
        <div className='flex justify-end md:justify-evenly gap-2'>
            {/* right side  */}
            
            <motion.div
  animate={{ rotate: isDroppedDown ? 90 : 0 }}
  transition={{ duration: 0.4, ease: "easeInOut" }}
>
  <RiMenu2Line
    className="size-8 md:hidden cursor-pointer"
    onClick={() => setIsDroppedDown(!isDroppedDown)}
  />
</motion.div>
             <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isDroppedDown ? 1 : 0, y: isDroppedDown ? 10 : -10 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`z-10 absolute right-1 mt-10 w-48 bg-light rounded-md shadow-lg overflow-hidden ${
          isDroppedDown ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col space-y-2 p-2">
          {navigation.map((item) => {
            if (!user) {
              if (item.name === "Assessment" || item.name === "Track Your Emotions") return null;
              if (item.name === "Profile") return <WalletSelector key={item.name} />;
              if (item.name === "Your Dost") return null;
            }
            return (
              <motion.li
                key={item.name}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={item.href} className="block px-4 py-2 text-white hover:bg-dark rounded-md">
                  {item.name}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
             
            
              <div className='hidden md:flex flex-row items-center gap-2 sm:gap-4 '> 
                {
              
                  navigation.map((item)=>{
                    if(!user){
                      if(item.name==='Assessment'){
                        return null
                      }

                      if(item.name==='Track Your Emotions'){
                        return null
                      }

                      if(item.name==='Profile'){
                        return <WalletSelector key={item.name} />
                      }

                      if(item.name==='Your Dost'){
                        return null
                      }
                    }
                    return (
                      <Link to={item.href} key={item.name} className='text-lg font-semibold text-white  px-2 rounded-md'>{item.name}</Link>
                    )
                  })
                }   
              </div>
            
      </div>
 
    </nav>
    </header>
  )
}

export default Navbar;
