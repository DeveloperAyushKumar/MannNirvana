import React from 'react'
import { useState, useEffect } from 'react';
import PodCastCard from '../../components/PodCastCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
// import required modules
import { Pagination,Mousewheel,Navigation } from 'swiper/modules';
import { Link } from 'react-router';

function PodCasts() {
    const podcastsData=[
      {
        title: "Mindfulness & Meditation",
        image: "https://example.com/podcast-image.jpg",
        description: "Explore mindfulness techniques for better living.",
        duration: "30 min"
      },    {
        title: "Mindfulness & Meditation",
        image: "https://example.com/podcast-image.jpg",
        description: "Explore mindfulness techniques for better living.",
        duration: "30 min"
      },    {
        title: "Mindfulness & Meditation",
        image: "https://example.com/podcast-image.jpg",
        description: "Explore mindfulness techniques for better living.",
        duration: "30 min"
      },    {
        title: "Mindfulness & Meditation",
        image: "https://example.com/podcast-image.jpg",
        description: "Explore mindfulness techniques for better living.",
        duration: "30 min"
      },    {
        title: "Mindfulness & Meditation",
        image: "https://example.com/podcast-image.jpg",
        description: "Explore mindfulness techniques for better living.",
        duration: "30 min"
      },    {
        title: "Mindfulness & Meditation",
        image: "https://example.com/podcast-image.jpg",
        description: "Explore mindfulness techniques for better living.",
        duration: "30 min"
      },
      

    ]
 
    return (
        <div className='w-full'>
         <h2 className='text-3xl font-semibold mb-6'>
            Hear the latest podcasts
         </h2>
         
         <div className="">
         {/* <Swiper
        slidesPerView={1}
        spaceBetween={20}
        mousewheel={true}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
        }}
        modules={[Pagination, Mousewheel, Navigation]}
        className="mySwiper"
      >
        {
        podcastsData.map((podcast, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <Link to={`/books/${podcast._id}`}>
              <PodCastCard podcast={podcast} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper> */}




      <Carousel className=" w-full px-6">
      <CarouselContent className="-ml-1 m ">
        {
      podcastsData.map((podcast, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              {/* <Card> */}
                {/* <CardContent className="flex aspect-square items-center justify-center p-6"> */}
                 
                <Link>
              <PodCastCard podcast={podcast} />
            </Link>
                {/* </CardContent> */}
              {/* </Card> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 [&>span]:hidden">
  <ChevronLeft className="w-6 h-6" />
</CarouselPrevious>

<CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 [&>span]:hidden">
  <ChevronRight className="w-6 h-6" />
</CarouselNext>

    </Carousel>
         </div>
        </div>
         
       )
  
}

export default PodCasts