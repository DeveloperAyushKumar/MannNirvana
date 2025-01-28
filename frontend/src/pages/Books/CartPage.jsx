import React from 'react'
// import { use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, removeFromCart } from '../../redux/features/cart/cart';
import bookUrlGenerator from '../../utils/bookUrlGenerator';
import { Link } from 'react-router';

function CartPage() {
    const cartItems =useSelector((state)=>state.cart.cartItems)
    const dispatch=useDispatch();
    const handleRemoveFromCart=(product )=>{
        dispatch(removeFromCart(product))
    }
    const handleClearCart =()=>{
        dispatch(clearCart())
    }
    const totalPrice =cartItems.length?cartItems.reduce((acc,item)=>acc=acc+item.newPrice,0):0;
  return (
<>
<div className='bg-slate-100 mx-4 my-2 p-2 md:mx-6 md:px-6 md:py-4 rounded-xl shadow-lg'>
    <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-xl font-primary m-2 '>Shopping Cart</h2>
        <button 
        className='bg-red-600 p-2 rounded-lg text-white font-primary font-semibold shadow-md'
        onClick={()=>(handleClearCart())}
        >Clear </button>

        </div>
        <div className=' flex flex-col gap-4 mt-4 p-1 md:px-4 '>
        {/* product cards  */}
        {
            cartItems.length>0?
            cartItems.map ((product )=>(
           <div key={product._id} className='flex font-primary p-2 md:px-4 border-b-4 border-gray-400 shadow-md bg-white rounded-md'>      
            <img src={bookUrlGenerator(product.coverImage)} alt={product.title +" image "} className='rounded-lg p-1 md:p-2 border-primary border-b-4 border-r-4 size-32 md:size-36'/> 
            <div className='flex flex-col p-1 w-full'>
                <div className='flex items-center justify-between '>  
                <h3 className='font-bold text-xl'>
                    {product.title}
                </h3>
                <p>Rs {product.newPrice}</p>
                </div>
                <div className='flex'>
                    <p>
                        <span className='font-semibold text-gray-500'>Category</span> : {product.category}
                    </p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-600'>Quantity : {1}</p>
                    <button className='text-red-600 hover:text-red-700'
                    onClick={()=>(handleRemoveFromCart(product))}
                    >Remove</button>
                </div>
            </div>
            </div>)
            )


            :
            <h2 className='m-auto font-extrabold text-2xl text-gray-500'>
                Nothing To Show !!
            </h2>
        }

        </div>
     
  
    <div className='flex flex-col gap-4 mt-4 p-2 border-t-primary border-t-2'>
        {/* lower part  */}
        <div className='flex justify-between text-primary text-xl font-bold'>
            <p>Total </p>
            <p className='text-black'>Rs. {totalPrice}</p>
        </div>
        <p className='m-auto mt-2 text-xs text-gray-400'>
            Shipping and taxes calculated at checkout.
        </p>
        <Link to="/checkout" className='bg-green-800 rounded-xl p-2 md:py-4 text-white font-semibold'>
            Checkout 
        </Link>

        <p className=' text-gray-500'>
            or <Link to="/" className='text-green-500 font-semibold hover:text-green-700'>Continue Shopping </Link>
        </p>
    </div>
    </div>


</>
  )
}

export default CartPage