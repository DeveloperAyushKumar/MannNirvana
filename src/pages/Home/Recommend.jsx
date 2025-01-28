import React from 'react'
import { useState, useEffect } from 'react';
import BookCard from "../Books/BookCard.jsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination,Mousewheel,Navigation } from 'swiper/modules';
import { Link } from 'react-router';

function Recommend() {
  
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch("books.json").then((res)=>res.json()).then((data)=>setBooks(data))
    },[])
    const RecommendedBooks = books;
    // console.log(RecommendedBooks)
  return (
   <div className='py-10 m-4'>
    <h2 className='text-3xl font-semibold mb-6'>
     Recommended Books
    </h2>
    
    <div className="">
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
              RecommendedBooks.map((book,index)=>(
                <SwiperSlide key={index}>
                  <Link key={index} to={`/books/${book._id}`}>
                    <BookCard key={index} book={book}/>
                  </Link>
                </SwiperSlide>  
                
              ))
          }
      
      </Swiper>
    </div>
   </div>
    
  )
}

export default Recommend