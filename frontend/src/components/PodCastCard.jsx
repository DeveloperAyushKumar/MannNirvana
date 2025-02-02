import React from 'react'
import {Link} from 'react-router'
import { BsCart4 } from "react-icons/bs";
function PodCastCard({podcast}) {
  const goToExternalSite = () => {
    window.open(podcast.href, "_blank", "noopener,noreferrer");
  };
  

    
  return (
    
    <div className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg" onClick={goToExternalSite}>
      {/* <a href={podcast.href} target="_blank" rel="noopener noreferrer"> */}

    <img src={podcast.image} alt={podcast.title} className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white">
      <h3 className="text-lg font-bold ">{podcast.title}</h3>
      <p className="text-sm opacity-80">{podcast.description.slice(0,30)+"..."}</p>
      <span className="text-sm font-semibold mt-2">{podcast.duration}</span>
    </div>
      {/* </a> */}
  </div>
  )
}

export default PodCastCard