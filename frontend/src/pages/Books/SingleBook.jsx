import React from 'react'
import { useParams } from 'react-router'
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cart';
import getBaseURL from '../../utils/getBaseURL';
import bookUrlGenerator from '../../utils/bookUrlGenerator';

function SingleBook() {
  const {id}=useParams();
  const {data:book,isLoading, isError}=useFetchBookByIdQuery(id);
  const dispatch =useDispatch() ;
  const handleAddToCart=(product )=>{
   dispatch(addToCart(product));
   
  }
  console.log(isError)
  if(isLoading)return <div>Loading ...</div>
  if(isError)return <div>Error happenging while Loading the book</div>
  return (
<div className='w-full'>
  <div className='m-auto p-4 flex flex-col items-center gap-4'>
    <div className='border-black border-l-2 border-b-4 border-r-2 shadow-md'>
    <h1 className='font-bold text-xl p-2'>{book.title}</h1>

    </div>
    <div className='border-4 border-primary rounded-md'>
      <img
      className=''
      src={bookUrlGenerator(book.coverImage)} alt="" />

    </div>
    <div>
      <p className='text-gray-700 mb-2 inline-block'><strong>Author</strong> : Admin</p>
      <p className='text-gray-700 mb-4 '><strong>Published</strong> :{new Date(book?.createdAt).toLocaleDateString()}</p>
      <p className='text-gray-700 mb-4'><strong>Category</strong> : {book.category}</p>
      <p><strong>Description</strong> : </p> <p>{book.description}</p>
    </div>
      <button className='bg-primary w-1/2 p-2 rounded-xl'
       onClick={()=>handleAddToCart(book)}>Add to Cart</button>

  </div>
</div>

  )
}

export default SingleBook