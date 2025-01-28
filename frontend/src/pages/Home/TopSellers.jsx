import React from 'react'
import { useState, useEffect } from 'react';
import BookCard from "../Books/BookCard.jsx";
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination,Mousewheel,Navigation } from 'swiper/modules';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi.js';

const categories=["All","Anxiety Disorder","Depression","Wellbeing","Psychology "]
function TopSellers() {
    const [selectedCategory, setSelectedCategory] = useState('Recent')
    // const [books, setBooks] = useState([]);
    // useEffect(() => {
    //     fetch("books.json").then((res)=>res.json()).then((data)=>setBooks(data))
    // },[])
// const arr=[{vale:1}];
// console.log(arr)
    const blogs=[
      {
        title:'Blog1',
        author:'Author1',
        read:'10 min read',
        description:'This is the first blog',
        coverUrl:'https://via.placeholder',
        views:1000,
        tags:['tag1','tag2','tag3'],
        


      },

    ];

    // console.log(books)
    // console.log(Array.isArray(books));
    const filteredBlogs = blogs.filter((blog)=>selectedCategory === "All" || blog.category === selectedCategory.toLowerCase())
    // console.log(filteredBooks)
  return (
   <div className='py-10 m-4'>
    <h2 className='text-3xl font-semibold mb-6'>
        Read The Words 
    </h2>
    <div className='mb-8 flex items-center '>
        <select className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none " name='categories' id="categories " onChange={(e)=>(setSelectedCategory(e.target.value))}>
        {
            categories.map((category)=>(
                <option key={category} value={category}>
                    {category}
                </option>
            ))
        }
        </select>
    </div>
   
    <div className=''>
    <Swiper
        slidesPerView={1}
        spaceBetween={20}
        mousewheel={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
        
          800: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1180:{
            slidesPerView: 3,
            spaceBetween: 20,
          }
        }}
        modules={[Pagination,Mousewheel,Navigation]}
        className="mySwiper"
        >
          {
              filteredBlogs.map((blog,index)=>(
                <SwiperSlide key={index}>
                  {/* {console.log(book)} */}
                     <Link key={index} to={`/blog/${blog._id}`}>
                    <BookCard key={index} book={blog}/>
                  </Link>
                </SwiperSlide>  
                
              ))
          }
      
      </Swiper>
    </div>
   </div>
    
  )
}

export default TopSellers