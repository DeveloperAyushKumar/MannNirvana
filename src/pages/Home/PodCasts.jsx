import React from 'react'
import { useState, useEffect } from 'react';
import PodCastCard from '../../components/PodCastCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination,Mousewheel,Navigation } from 'swiper/modules';
import { Link } from 'react-router';

function PodCasts() {
    const podcastsData=[
        { title:'Podcast1',
            author:'Author1',
            description:'This is the first podcast',
            coveUrl:'https://via.placeholder.com/150,',
            videoUrl:'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
            views:1000,


            },
            { title:'Podcast1',
                author:'Author1',
                description:'This is the first podcast',
                coveUrl:'https://via.placeholder.com/150,',
                videoUrl:'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
                views:1000,
                
    
                },
                { title:'Podcast1',
                    author:'Author1',
                    description:'This is the first podcast',
                    coveUrl:'https://via.placeholder.com/150,',
                    videoUrl:'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
                    views:1000,
                    
        
                    },
                    { title:'Podcast1',
                        author:'Author1',
                        description:'This is the first podcast',
                        coveUrl:'https://via.placeholder.com/150,',
                        videoUrl:'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
                        views:1000,
                        
            
                        },
                        { title:'Podcast1',
                            author:'Author1',
                            description:'This is the first podcast',
                            coverUrl:'https://via.placeholder.com/150,',
                            videoUrl:'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
                            views:1000,
                            
                
                            },

    ]
 
    return (
        <div className='py-10 m-4'>
         <h2 className='text-3xl font-semibold mb-6'>
            Hear the latest podcasts
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
                   podcastsData.map((podcast,index)=>(
                     <SwiperSlide key={index}>
                       <Link key={index} to={`/books/${podcast._id}`}>
                         <PodCastCard key={index} podcast={podcast}/>
                       </Link>
                     </SwiperSlide>  
                     
                   ))
               }
           
           </Swiper>
         </div>
        </div>
         
       )
  
}

export default PodCasts