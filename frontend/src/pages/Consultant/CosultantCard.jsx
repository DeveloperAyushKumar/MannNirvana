import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

function CosultantCard({consultant}) {
  return (
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
  <CardHeader>
    <CardTitle>{consultant.name}</CardTitle>
    <CardDescription> <span>{consultant.email}</span> <span>{consultant.phone}</span></CardDescription>
  </CardHeader>
  <CardContent>
    <p>{consultant.about}</p>
  </CardContent>
  <CardFooter>
    {consultant.sepciality.map((speciality, index) => (
        <span key={index} className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2">
        {speciality}
      </span>
    ))}
  </CardFooter>
</Card>


 
  )
}

export default CosultantCard