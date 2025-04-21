import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Get event details from URL parameters
  const eventId = queryParams.get('event_id');
  const eventTitle = queryParams.get('title');

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 flex justify-center items-center">
            <div className="text-center">
              <div className="bg-white rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
            </div>
          </div>

          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You For Your Purchase
            </h1>
            
            {eventTitle && (
              <p className="text-xl text-gray-700 mb-6">
                You have successfully registered for: <span className="font-semibold">{eventTitle}</span>
              </p>
            )}
            
            <p className="text-gray-600 mb-8">
              A confirmation has been sent to your email. You can view your registered events in your dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button   
                onClick={() => navigate(`/event-details/${eventId}`)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Go to Event
              </button>
              <button
                onClick={() => navigate('/events')}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Browse More Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
