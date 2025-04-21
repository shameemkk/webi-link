import React from "react";
import { useAllEventDataList} from "../../hooks/useEventData";
import EventCard from '../Events/EventCard';
import { useNavigate } from 'react-router-dom'; // Import useNavigate\

const FeaturedEvents = () => {
  const navigate = useNavigate();
  const { data: events = [], isLoading: eventsLoading } = useAllEventDataList();
  
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
    const formattedEvents = events.slice(0, 3).map(formatEventData);

  return (
   
    <>
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
  
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        </div> */}
          {/* component */}
          <EventCard formattedEvents={formattedEvents} />
      
  
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
    )}
    </>
    
  );
};

export default FeaturedEvents;
