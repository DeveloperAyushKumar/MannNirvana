import React from "react";
import { Calendar, MapPin } from "lucide-react";

const EventCard = ({ event }) => {
 
    const goToExternalSite = () => {
      window.open(event.href, "_blank", "noopener,noreferrer");
    };
  return (
    <div className="w-[280px] bg-white rounded-2xl shadow-lg p-4 " onClick={goToExternalSite}>
      {/* 📌 Top Image Section */}
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-40 object-cover"
        />
        {/* 📅 Date Badge */}
        <div className="absolute top-2 left-2 bg-white px-3 py-2 rounded-lg text-center shadow-md">
          <p className="text-sm font-semibold text-gray-600">{event.date.day}</p>
          <p className="text-lg font-bold text-purple-700">{event.date.month}</p>
        </div>
      </div>

      {/* 📄 Event Details */}
      <div className="p-3">
        <h3 className="text-lg font-bold text-gray-900">

          {event.name} <span className="text-dark">✔</span>

        </h3>
        <p className="text-sm text-gray-600">
          By {event.organizer.slice(0,15)+".."}
        </p>

        {/* 📍 Location & Distance */}
        <div className="mt-3 flex items-center justify-between bg-gray-100 p-2 rounded-lg">
          <div className="flex items-center gap-1 text-purple-600 font-semibold">
            <MapPin className="w-4 h-4" />
            <p className="text-sm">{event.location}</p>
          </div>
          <p className="text-orange-500 font-bold text-sm">{event.distance} km</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
