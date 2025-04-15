import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sampleEvents from '../assets/data/sampleEvents';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the event with the matching ID
    const foundEvent = sampleEvents.find((e, index) => index.toString() === id);
    
    if (foundEvent) {
      setEvent(foundEvent);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/events')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  // Format the date
  const formattedDate = event.start_datetime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format the time
  const formattedTime = event.start_datetime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Format price
  const formattedPrice = event.is_paid ? `$${event.price.toFixed(2)}` : 'Free';

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-12 flex justify-center items-center">
            <span className="text-9xl text-white">{event.title.charAt(0)}</span>
          </div>
          
          <div className="p-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {event.category}
              </span>
              <span className={`px-3 py-1 ${event.is_paid ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'} rounded-full text-sm font-medium`}>
                {event.is_paid ? 'Paid' : 'Free'}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {event.event_type === 'live' ? 'Live Event' : 'Recorded'}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
            
            <p className="text-gray-700 text-lg mb-6">{event.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Details</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700">{formattedDate}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{formattedTime} ({event.duration} minutes)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{formattedPrice}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How to Join</h3>
                <p className="text-gray-700 mb-4">
                  {event.event_type === 'live' 
                    ? 'Join us live via the streaming link below:'
                    : 'Watch the recorded session at your convenience:'}
                </p>
                <a 
                  href={event.event_type === 'live' ? event.streaming_link : event.video_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  {event.event_type === 'live' ? 'Join Event' : 'Watch Recording'}
                </a>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate('/events')}
                  className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition duration-300"
                >
                  Back to Events
                </button>
                
                {event.is_paid && (
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Register Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;