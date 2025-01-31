import React from 'react'
import Events from './Events'
import PodCasts from './PodCasts'
import LeaderBoard from './LeaderBoard'
import News from './News'
import ChannelTree from './DiscordTree'
// import  SpotifyWebApi from 'spotify-web-api-node';
function Home() {

// const spotifyApi = new SpotifyWebApi({
//   clientId: 'e7d90605373a49fabced47a4e5909213',
//   clientSecret: '2ae96af5070d440b9ee99ee855a40a24'
// });


// // Retrieve an access token
// spotifyApi.clientCredentialsGrant().then(
//   function(data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);
    
//     // Save the access token for use in requests
//     spotifyApi.setAccessToken(data.body['access_token']);
//   },
//   function(err) {
//     console.log('Something went wrong when retrieving an access token', err);
//   }
// );

// spotifyApi.search('mental health', ['show'], { limit: 10 }).then(
//   function(data) {
//     console.log('Search results:', data.body);
//     const podcasts = data.body.shows.items;
//     podcasts.forEach(podcast => {
//       console.log(`Name: ${podcast.name}, Description: ${podcast.description}`);
//     });
//   },
//   function(err) {
//     console.log('Error occurred: ' + err);
//   }
// );




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