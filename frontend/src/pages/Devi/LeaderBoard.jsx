import React from 'react'

function LeaderBoard() {
  const leaderBoardData=[{name :'Rahul',score:100},
    {name :'priya',score:80}, 
    {name :'priya',score:60},
    {name :'priya',score:40},
    {name :'priya',score:20},


  ]
  const {username,userScore}={username:'Rahul',userScore:50} 
  return (
   <div className='bg-white p-4 rounded-lg'>
    <h1
    className='text-2xl font-bold text-center border-customBgBtn border-b-2'
    >Leaderboard</h1>
    <ul>
    <li key='attributes' className='flex justify-between font-bold mt-2 text-customBgBtn '>
            <span >Name</span>
            <span>Mann Coins</span>
          </li>

          <li key='user' className='flex justify-between font-semibold'>
            <span>{username}</span>
            <span>{userScore}</span>
          </li>
      {
        leaderBoardData.map((data,index)=>(
          <li key={index} className='flex justify-between'>
            <span>{data.name}</span>
            <span>{data.score}</span>
          </li>
        ))
      }
    </ul>
    <p>.....</p>


   </div>
  )
}

export default LeaderBoard