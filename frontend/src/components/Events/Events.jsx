import React, { useState } from 'react';
import { useAllEventDataList} from "../../hooks/useEventData";
import EventCard from './EventCard';

const Events = () => {
   // Initialize navigate
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
    const priceDisplay = event.is_paid ? `$${event.price}` : 'Free';
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
          <EventCard formattedEvents={formattedEvents} />
        )}
      </div>
    </section>
  );
};

export default Events;