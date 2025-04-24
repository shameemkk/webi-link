import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ZegoCloud from '../components/MeetingSDK/ZegoCloud';
import { useAuth } from '../context/AuthContext';
import { useStartMeetingMutate } from '../hooks/useEventData';
import { toast } from 'react-toastify';



const Meeting = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};
  const { mutate: startMeeting, isLoading: startMeetingLoading } =useStartMeetingMutate();

  const [start, setStart]= useState(false) ;
  const role = event.organizer_id._id === user.id ? 'Host' : 'Participant';
  const generateRoomID =`Room_${Math.random().toString(36).substring(2, 10)}`;
  const roomID= event.roomName || generateRoomID;
  console.log(role)
  useEffect(() => {
    if (!event || !roomID || !role) {
      navigate('/dashboard');
    }
  }, [event, user, role, navigate]);

  const handleStart = ()=>{
    try {
      if(!event.roomName && user.role === 'Organizer'){
        startMeeting(
          { eventId : event._id  , roomName : roomID },
          {
            onError: (error) => {
              if (
                error.response?.data?.errors &&
                Array.isArray(error.response.data.errors)
              ) {
                error.response.data.errors.forEach((err) => {
                  toast.error(err.msg);
                });
              } else {
                const errorMessage =
                  error.response?.data?.message || "Failed to create event";
                toast.error(errorMessage);
              }
            },
            onSuccess: () => {
              toast.success("Event starting.....");
              setStart(true);
            },
          }
        );
      }else{
        setStart(true);
      }
    } catch (error) {
      toast.error("Failed to start meeting");
      console.log('Error',error)
    }
  };



  

  return (
    <div className="h-screen w-full bg-gray-100">
      {
        !start ? 
        <div className="flex flex-col justify-center items-center h-full bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="mb-6 text-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 text-blue-500 animate-pulse mx-auto" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                />
              </svg>
              <h2 className="mt-4 text-xl font-semibold text-gray-700">Ready to join the meeting?</h2>
            </div>
            <div className="space-y-4">
              <button
                disabled={startMeetingLoading}
                onClick={handleStart}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center space-x-2"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg> 
                <span>{startMeetingLoading ? 'Starting...' : 'Start Meeting'}</span>
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        :<ZegoCloud roomID={roomID} userName={user.name} initialRole={role} />
      }
      
    </div>
  );
};

export default Meeting;
