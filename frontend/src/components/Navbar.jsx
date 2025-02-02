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

function Navbar() {
  const { isConnected } = useWalletContext();
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
      name : 'Assessment',
      href: '/assessment'
    },

    {
      name :'Devi',
      href:'/devi'
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
        <div className='flex justify-evenly gap-2'>
            {/* right side  */}
            
             { !isDroppedDown&&<RiMenu2Line className='size-8 sm:hidden' onClick={()=>setIsDroppedDown(!isDroppedDown)}></RiMenu2Line>}
             {
              !isDroppedDown&&
              <div className='flex flex-col items-center gap-2 sm:flex-row sm:gap-4'> 
                {
              
                  navigation.map((item)=>{
                    if(!isConnected){
                      if(item.name==='Assessment'){
                        return null
                      }

                      if(item.name==='Profile'){
                        return <WalletSelector />
                      }
                    }
                    return (
                      <Link to={item.href} key={item.name} className='text-lg font-semibold text-white  px-2 rounded-md'>{item.name}</Link>
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

export default Navbar;
