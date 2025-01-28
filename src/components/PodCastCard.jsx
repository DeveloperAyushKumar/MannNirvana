import React from 'react'
import {Link} from 'react-router'
import { BsCart4 } from "react-icons/bs";
function PodCastCard({podcast}) {

    
  return (
    <div className='max-w-md flex p-6 gap-4  border border-gray-400 rounded-md shadow-lg bg-white hover:scale-105 hover:shadow-xl transition transform duration-300 '>
        <div className='w-1/2'>
            <img className="w-full" src={podcast.coverUrl} alt="" />
            
        </div>
       <div className='w-1/2 font-primary space-y-2 p-2'>
<Link>
<h3 className='text-xl font-semibold '>{podcast.title}</h3>
</Link>
<p className="">{podcast.description.length>40?podcast.description.slice(0,40)+"..." :podcast.description}</p>
      <div className='flex gap-2'>Rs
        <span>
            {podcast.author}
        </span>
       
      </div>
     

   
        </div>
       
        
    </div>
  )
}

export default PodCastCard