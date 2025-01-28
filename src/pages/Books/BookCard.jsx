import React from 'react'
import {Link} from 'react-router'
import { BsCart4 } from "react-icons/bs";
import bookUrlGenerator from '../../utils/bookUrlGenerator.jsx'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cart.js';
function BookCard({book}) {
    // console.log(book.coverImage)
   const dispatch= useDispatch();
   const handleAddToCart=(product)=>{
    // console.log(product);
    dispatch(addToCart(product));
   }
    
  return (
    <div className='max-w-md flex p-6 gap-4  border border-gray-400 rounded-md shadow-lg bg-gradient-to-b from-gray-100 to-gray-50 hover:scale-105 hover:shadow-xl transition transform duration-300 '>
        <div className='w-1/2'>
            <img className="w-full" src={bookUrlGenerator(book.coverImage)} alt="" />
            
        </div>
       <div className='w-1/2 font-primary space-y-2 p-2'>
<Link>
<h3 className='text-xl font-semibold '>{book.title}</h3>
</Link>
<p className="">{book.description.length>40?book.description.slice(0,40)+"..." :book.description}</p>
      <div className='flex gap-2'>Rs
        <span>
            {book.newPrice}
        </span>
        <span className='line-through'>
            {book.oldPrice} 
        </span>
      </div>
     

       <button onClick={()=>(handleAddToCart(book))}
       
       className='flex gap-2 bg-primary text-white px-4 py-2 rounded-xl'>
           <BsCart4 className='size-6 inline-block'/>
            Add to Cart
        </button>
        </div>
       
        
    </div>
  )
}

export default BookCard