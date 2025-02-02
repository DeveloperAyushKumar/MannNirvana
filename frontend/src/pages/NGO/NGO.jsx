import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const ngos = [
  {
    name: "MindCare Foundation",
    description: "Providing mental health support and counseling.",
    website: "https://mindcare.org",
    address: "0x95b27793895e205c1ef7c9e0d968450b7f4d05821c0e0933038a1df3a6862b6a"
  },
  {
    name: "Hope Haven",
    description: "A safe space for emotional well-being and therapy.",
    website: "https://hopehaven.org",
    address: "0x95b27793895e205c1ef7c9e0d968450b7f4d05821c0e0933038a1df3a6862b6a"
  },
  {
    name: "Serenity Minds",
    description: "Offering free mental health resources and support groups.",
    website: "https://serenityminds.org",
    address: "0x95b27793895e205c1ef7c9e0d968450b7f4d05821c0e0933038a1df3a6862b6a"
  },
];

const NGOCard = ({ name, address, description, website }) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    alert("Wallet address copied!");
  };

  return (
    <Card className="p-6 shadow-lg rounded-xl border border-gray-300 hover:shadow-2xl transition-all bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <div className="flex items-center justify-between text-gray-500 bg-gray-100 p-2 rounded-lg mb-4 text-xs">
          <span className="truncate">{address.slice(0, 10)}...{address.slice(-10)}</span>
          <button onClick={copyAddress} className="ml-2 p-1 hover:text-gray-700">
            <Copy size={16} />
          </button>
        </div>

        <div className="flex gap-3">
          <a href={website} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full">Visit Website</Button>
          </a>
          <a href={`/funding/${address}/${name}`} target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
              Fund NGO
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

const NGOList = () => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">Mental Health NGOs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {ngos.map((ngo, index) => (
          <NGOCard key={index} {...ngo} />
        ))}
      </div>
    </div>
  );
};

export default NGOList;
