import React from 'react'
import Events from './Events'
import PodCasts from './PodCasts'
import LeaderBoard from './LeaderBoard'
import News from './News'
function Home() {
  return (
    <div >
      <div className='flex justify-around mt-8'>
        <div className='w-full'>
        <PodCasts/>
        </div>
        {/* <LeaderBoard/> */}
      </div>
  
      <Events/>
      <News/>
    </div>
 
  )
}

export default Home;