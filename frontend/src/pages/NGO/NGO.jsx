import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ngos = [
  {
    name: "MindCare Foundation",
    description: "Providing mental health support and counseling.",
    website: "https://mindcare.org",
  },
  {
    name: "Hope Haven",
    description: "A safe space for emotional well-being and therapy.",
    website: "https://hopehaven.org",
  },
  {
    name: "Serenity Minds",
    description: "Offering free mental health resources and support groups.",
    website: "https://serenityminds.org",
  },
];

const NGOCard = ({ name, description, website }) => {
  return (
    <Card className="p-4 shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <a href={website} target="_blank" rel="noopener noreferrer">
          <Button variant="outline">Visit Website</Button>
        </a>
      </CardContent>
    </Card>
  );
};

const NGOList = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Mental Health NGOs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ngos.map((ngo, index) => (
          <NGOCard key={index} {...ngo} />
        ))}
      </div>
    </div>
  );
};

export default NGOList;
