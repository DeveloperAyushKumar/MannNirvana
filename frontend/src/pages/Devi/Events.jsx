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

    image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F488521249%2F587816501723%2F1%2Foriginal.20230409-105741?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C40%2C1280%2C640&s=a86137a4df29b52203c1985b0718ba9e", // Replace with actual image
    name: "Women's Mental Health-For Women with Women",
    organizer: "C&D Learning Solutions",
    location: "Online",
    href:"https://www.eventbrite.com/e/womens-mental-health-for-women-with-women-tickets-576907956227?aff=ebdssbdestsearch&keep_tld=1",

    // distance: "18.2",
    date: { day: "21", month: "Feb 2025" }
  },
  {

    image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F941932693%2F231441994134%2F1%2Foriginal.20250122-150618?crop=focalpoint&fit=crop&w=940&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=29a174cf66c6626e467af368bfea632c", // Replace with actual image
    name: "Special Issues in Women's Mental Health",
    organizer: "By Mindspring Mental Health Alliance",
    location: "Online",
    // distance: "18.2",
    href:"https://www.eventbrite.com/e/special-issues-in-womens-mental-health-free-webinar-tickets-1217976513539?aff=ebdssbdestsearch&_gl=1*5rkn7i*_up*MQ..*_ga*MTQ2MzcwMjcwNS4xNzM4MzM4MDQ0*_ga_TQVES5V6SH*MTczODMzODA0NC4xLjAuMTczODMzODA0NC4wLjAuMA..",
    date: { day: "25", month: "Feb 2025" }
  },  {

    image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F913977123%2F515200386371%2F1%2Foriginal.20241209-091924?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=feecca86cc3daa9b76d9a136174315f0", // Replace with actual image
    name: "Women's Mental Wellbeing Group",
    organizer: "By Rogue Debby CIC",
    location: "Online",
    // distance: "18.2",
    href:"https://www.eventbrite.com/e/womens-mental-wellbeing-group-registration-1109065537879?aff=ebdssbdestsearch&keep_tld=1",
    date: { day: "11", month: "Feb 2025" }
  },  {

    image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F798752549%2F259563369392%2F1%2Foriginal.20240629-222923?w=940&auto=format%2Ccompress&q=75&sharp=10&s=079b160baf585608ecb4415c4c782456", // Replace with actual image
    name: "Workplace Mental Health",
    organizer: "By Ajuda Limited",
    location: "Online",
    distance: "18.2",
    href:"https://www.eventbrite.com/e/mental-health-online-workplace-mental-health-tickets-937383658757?aff=ebdssbdestsearch&keep_tld=1",
    date: { day: "08", month: "May 2025" }
  },  
  {

    image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F932202783%2F307518861351%2F1%2Foriginal.20250110-051825?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=f55f9927d8dac04608bfe6c5a81d6855", // Replace with actual image
    name: "Youth Mental Health Awareness",
    organizer: "By It's a Playground Ltd",
    location: "Online",
    distance: "18.2",

    date: { day: "7", month: "Feb 2025" },
    href: "https://www.eventbrite.com/e/youth-mental-health-awareness-tickets-1145197639969?aff=ebdssbdestsearch&keep_tld=1"

  },


]
 
    return (
        <div className='w-full'>
         <h2 className='text-3xl font-semibold mb-6 border-b-2 border-dark p-1'>
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