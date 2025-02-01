import React from 'react'
import Events from './Events'
import PodCasts from './PodCasts'
import LeaderBoard from './LeaderBoard'
import News from './News'
import ChannelTree from './DiscordTree'
// import  SpotifyWebApi from 'spotify-web-api-node';
function Home() {
  return (
    <div className='flex ' >
      <div className='w-1/4'>
      <ChannelTree/>
      </div>

      <div className='w-3/4'>
      <div className='flex justify-around mt-8'>
        <div className='w-full'>
        <PodCasts/>
        </div>
        {/* <LeaderBoard/> */}
      </div>
  
      <Events/>
      <News/>
      </div>
    </div>
 
  )
}

export default Home;