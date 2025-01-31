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
import EventCard from '@/src/components/EventCard';

function Events() {
  const eventData = [
    {

    image: "https://via.placeholder.com/300", // Replace with actual image
    name: "Festival Dancer",
    organizer: "By Jorou William",
    location: "Kadupugur, Sukabumi",
    distance: "18.2",
    date: { day: "22", month: "Dec" }
  },
  {

    image: "https://via.placeholder.com/300", // Replace with actual image
    name: "Festival Dancer",
    organizer: "By Jorou William",
    location: "Kadupugur, Sukabumi",
    distance: "18.2",
    date: { day: "22", month: "Dec" }
  },  {

    image: "https://via.placeholder.com/300", // Replace with actual image
    name: "Festival Dancer",
    organizer: "By Jorou William",
    location: "Kadupugur, Sukabumi",
    distance: "18.2",
    date: { day: "22", month: "Dec" }
  },  {

    image: "https://via.placeholder.com/300", // Replace with actual image
    name: "Festival Dancer",
    organizer: "By Jorou William",
    location: "Kadupugur, Sukabumi",
    distance: "18.2",
    date: { day: "22", month: "Dec" }
  },  {

    image: "https://via.placeholder.com/300", // Replace with actual image
    name: "Festival Dancer",
    organizer: "By Jorou William",
    location: "Kadupugur, Sukabumi",
    distance: "18.2",
    date: { day: "22", month: "Dec" }
  },
  {

    image: "https://via.placeholder.com/300", // Replace with actual image
    name: "Festival Dancer",
    organizer: "By Jorou William",
    location: "Kadupugur, Sukabumi",
    distance: "18.2",
    date: { day: "22", month: "Dec" }
  },
  {

    image: "https://via.placeholder.com/300", // Replace with actual image
    name: "Festival Dancer",
    organizer: "By Jorou William",
    location: "Kadupugur, Sukabumi",
    distance: "18.2",
    date: { day: "22", month: "Dec" }
  },

]
 
    return (
        <div className='w-full'>
         <h2 className='text-3xl font-semibold mb-6'>
      Attend The Events
         </h2>
         
         <div className="">
      <Carousel className=" w-full px-6">
      <CarouselContent className="-ml-1 m ">
        {
      eventData.map((event, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              {/* <Card> */}
                {/* <CardContent className="flex aspect-square items-center justify-center p-6"> */}
                 
                <Link>
              <EventCard key={index} event={event} />
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

export default Events