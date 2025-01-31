import React, { useState,useEffect } from 'react'
import ConsultantCard from './CosultantCard'

import { useFetchAllConsultantsQuery } from '@/src/redux/features/consultant/consultantApi';
// import { sep } from 'path'
export default function Consultant() {
    // const[ consultants,setConsultants] =useState([]);
//   useEffect(()=>{
    const {data:consultants=[], error, isLoading} = useFetchAllConsultantsQuery();
    // setConsultants(data);
    console.log(consultants);  
    

        
  return (
    <div className='mt-6'>
        <h1  className='text-2xl font-semibold ml-6 mt-8 border-b-2 border-black pb-2 '>Consult To Professional </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 ml-6 mr-6'>
            {
              consultants.length?  consultants.map((consultant, index) => (
                    <ConsultantCard key={index} consultant={consultant} />
                )
            )
            :
            <p>Loading...</p>
            }

        </div>
    </div>
  )
}
