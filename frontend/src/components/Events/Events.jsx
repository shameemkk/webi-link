import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAllEventDataList} from "../../hooks/useEventData";

const Events = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { data: events = [], isLoading: eventsLoading } = useAllEventDataList();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(events.map(event => event.category))];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.organizer_id && event.organizer_id.name && event.organizer_id.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Format event data for display
  const formatEventData = (event) => {
    // Format price display
    const priceDisplay = event.is_paid ? `$${event.price}` : 'Free';
    // Format date
    const formatDate = (dateString) => {
      if (!dateString) return 'To Be Announced';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };
    
    return {
      ...event,
      formattedDate: formatDate(event.start_datetime),
      formattedPrice: priceDisplay,
      attendeesCount: event.attendees ? event.attendees.length : 0,
      organizerName: event.organizer_id ? event.organizer_id.name : 'Unknown'
    };
  };
  
  const formattedEvents = filteredEvents.map(formatEventData);

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and join amazing events from our community
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search events or instructors..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={eventsLoading}
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full ${selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'}
                hover:shadow-md transition duration-300 ${eventsLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => setSelectedCategory(category)}
                disabled={eventsLoading}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {eventsLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="text-xl text-gray-600 mt-4">Loading events...</p>
          </div>
        ) : formattedEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No events found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formattedEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 flex justify-center items-center">
                  <span className="text-6xl text-amber-50">{event.title.charAt(0)}</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                    <span className={`px-3 py-1 ${!event.is_paid ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'} rounded-full text-sm font-medium`}>
                      {event.formattedPrice}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">By {event.organizerName}</p>
                  <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>
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
                    disabled={eventsLoading}
                    onClick={() => navigate(`/event-details/${event._id}`)} // Add onClick handler
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;