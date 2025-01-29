import React from 'react'
import ConsultantCard from './CosultantCard'
import exp from 'constants'
// import { sep } from 'path'
export default function Consultant() {
    const consultants = [
        {
            name: 'John Doe',
            id : 1,
            email:'test@mail.com',
            image: '/path/to/image.jpg',
            
            about:'John is a licensed therapist with 10 years of experience in mental health counseling.',
            rating: 4.8,
            reviews: 120,
            address :"1234 Elm Street, New York, NY 10001",
            phone: "(123) 456-7890",
            sepciality:[ 'Anxiety',' Depression','Stress', 'Trauma']

        }, 
        {
            name: 'John Doe',
            id : 1,
            email:'test@mail.com',
            image: '/path/to/image.jpg',
            
            about:'John is a licensed therapist with 10 years of experience in mental health counseling.',
            rating: 4.8,
            reviews: 120,
            address :"1234 Elm Street, New York, NY 10001",
            phone: "(123) 456-7890",
            sepciality:[ 'Anxiety',' Depression','Stress', 'Trauma']

        },  
        {
            name: 'John Doe',
            id : 1,
            email:'test@mail.com',
            image: '/path/to/image.jpg',
            
            about:'John is a licensed therapist with 10 years of experience in mental health counseling.',
            rating: 4.8,
            reviews: 120,
            address :"1234 Elm Street, New York, NY 10001",
            phone: "(123) 456-7890",
            sepciality:[ 'Anxiety',' Depression','Stress', 'Trauma']

        },    
   
    ]
  return (
    <div className='mt-6'>
        <h1  className='text-2xl font-semibold ml-6 mt-8 border-b-2 border-black pb-2 '>Consult To Professional </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 ml-6 mr-6'>
            {
                consultants.map((consultant, index) => (
                    <ConsultantCard key={index} consultant={consultant} />
                ))
            }

        </div>
    </div>
  )
}
