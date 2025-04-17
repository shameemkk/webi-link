import React from "react";
import { useNavigate } from "react-router-dom";
import sampleEvents from "../../assets/data/sampleEvents";

const FeaturedEvents = () => {
  const navigate = useNavigate();
  // Use only the first 3 events from the sample data
  const events = sampleEvents.slice(0, 3).map((event, index) => ({
    id: index,
    title: event.title,
    category: event.category,
    price: event.is_paid ? "Paid" : "Free",
    date: event.start_datetime.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    instructor: event.description.split(',')[0],
    attendees: Math.floor(Math.random() * 150) + 50, // Random number for attendees
    // Use first letter of title instead of emoji
    image: event.title.charAt(0),
  }));

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our most popular upcoming events from industry-leading experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 flex justify-center items-center">
                <span className="text-6xl text-white font-bold">{event.image}</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                  <span
                    className={`px-3 py-1 ${
                      event.price === "Free"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    } rounded-full text-sm font-medium`}
                  >
                    {event.price}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4">By {event.instructor}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{event.date}</span>
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button 
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/event-details/${event.id}`);
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/events");
            }}
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300"
          >
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
