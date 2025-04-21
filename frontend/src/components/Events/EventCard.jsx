import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ formattedEvents }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {formattedEvents.map((event) => (
        <div
          key={event._id}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 flex justify-center items-center">
            <span className="text-6xl text-amber-50">
              {event.title.charAt(0)}
            </span>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {event.category}
              </span>
              <span
                className={`px-3 py-1 ${
                  !event.is_paid
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
                } rounded-full text-sm font-medium`}
              >
                {event.formattedPrice}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {event.title}
            </h3>
            <p className="text-gray-600 mb-4">By {event.organizerName}</p>
            <p className="text-gray-700 mb-4 line-clamp-2">
              {event.description}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{event.formattedDate}</span>
              <span>Duration: {event.duration} min</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
              <span>Status: {event.status}</span>
              <span>{event.attendeesCount} attendees</span>
            </div>
          </div>
          <div className="px-6 pb-6">
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => navigate(`/event-details/${event._id}`)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCard;
