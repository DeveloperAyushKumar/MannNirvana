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
        title: "The ElevateHER",
        image: "https://i.scdn.co/image/ab67656300005f1f5132112bbaabc1a5540bea7a",
        description: "This podcast was created to support moms, wife’s, bosses and the average everyday woman alike. As we navigate everyday life, consider this “The Sister Circle Support Group Everyone needs SOMEONE! And speaking from experience, knowing that you aren’t alone in everyday life makes all the difference in the world.Feel",
        duration: "26 min",
        href:"https://open.spotify.com/show/6ErxSnAQpNpgxBG7fV5aC8?si=798899a64a0443c8"
      },    {
        title: "The Sad Girl",
        image: "https://www.evanstonian.net/wp-content/uploads/2023/03/IMG_0062.png",
        description: "Frankie is simply a queer Mexican-American creator who’s mediums include-but are not limited to- writing, photography, videography, collage-ing, drawing, cooking, sewing, and now podcasting. Her goal with The Sad Girl Podcast is to provide a space where she can share herself in continued vulnerability and transparency. Not only will she be taking you with her into worlds she has created in her writing, but she will also be taking you with her down her path to truth and hopefully, joy.",
        duration: "40 min",
        href:"https://open.spotify.com/show/0v0fN45Ue5RlkBcsvmd0x2?si=dbbb671580ae480b"
      },    {
        title: "Growing with the Flow",
        image: "https://i.scdn.co/image/ab6765630000ba8a51deccc804bfdc9bb1f3a32a",
        description: "Navigating the brink of adulthood, life transitions and building a life you love. With some life experience under her belt, Nayna will be revealing everything she’s learnt so far as well as navigating this new chapter and taking a step into the unknown, sharing experiences and tips along the way. From jobs, student life and graduating to health, relationships and activism, this podcast was created to be a safe place to figure out who we are and who we want to be. Instead of fearing the future we’re going to be mastering the art of growing with the flow.",
        duration: "40 min",
        href:"https://open.spotify.com/show/571TfkIrKfbMXse360yYfT?si=2a2dbb6d78aa446d",
      },    {
        title: "Girl Glow Up",
        image: "https://i.scdn.co/image/ab6765630000ba8adab7bb5dfc2b7784b250554c",
        description: "This bite-size health & wellness podcast is dedicated to getting you closer to becoming the best version of yourself. Your host Leah will give you step-by-step guides on different topics to improve your mental, emotional, and physical health. It's never too late to start your wellness journey!",
        duration: "50 min",
        href: "https://open.spotify.com/show/4mBWzhknu4RjiQg9SpjDrV?si=11e43bf943f54132"
      },    {
        title: "Dear Teenage Me ",
        image: "https://i.scdn.co/image/ab6765630000ba8a5ea7855e3811e2602fd7085a",
        description: "Dear Teenage Me, a Spotify Original podcast produced by Yuvaa Originals, is a series of intimate conversations with one’s teenage self about everything that used to matter. With Ahsaas Channa as its host, yahan sab apni stories share karte hain, aur unn stories se they create hope. Press the bell icon to never miss an episode.",
        duration: "58 min",
        href:"https://open.spotify.com/show/24A9GbdZh0Q8XRsVBUlz69?si=6e2553ddb29d4c2b"

      },  
      

    ]
 
    return (
        <div className='w-full'>
         <h2 className='text-3xl font-semibold mb-6 border-b-2 border-dark p-1 '>
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




      <Carousel className=" w-full px-6 ">
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