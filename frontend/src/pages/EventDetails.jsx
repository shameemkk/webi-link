import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventDataById , useEventRegisterMutate } from "../hooks/useEventData";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import UpcomingAlert from "../components/Events/UpcomingAlert";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: event, isLoading: eventsLoading } = useEventDataById(id);
  const { mutate: registerEvent, isLoading: regiterLoading } =useEventRegisterMutate();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user,checkAuth } = useAuth();

//loading state
  if (eventsLoading) {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Event Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  // Format the date (consistent with Events.jsx)
  const formatDate = (dateString) => {
    if (!dateString) return "To Be Announced";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const formattedDate = formatDate(event.start_datetime);
  const formattedTime = new Date(event.start_datetime).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const formattedPrice = event.is_paid ? `$${event.price.toFixed(2)}` : "Free";
  const organizerName = event.organizer_id
    ? event.organizer_id.name
    : "Unknown";
  const attendeesCount = event.attendees ? event.attendees.length : 0;

  const handleRegister = async () => {
    checkAuth();
    if (!user) {
      toast.error("Please login to complete the payment.");
      return;
    }
    if (!event.is_paid) {
      registerEvent( id, {
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message || "Failed to regiter event";
          toast.error(errorMessage);
      },
      onSuccess: () => {
        toast.success("Event regiter successfully");
      },
      });
     return; 
    }else{
      try {
        setIsCheckoutLoading(true);
        const res = await axios.post("api/payment/create-checkout-session", {
          eventId: id,
        });
        window.location.href = res.data.url;
      } catch (error) {
        toast.error("Error processing payment. Please try again later.");
        console.error("Checkout error:", error);
        setIsCheckoutLoading(false);
      }
    }
  };

  const handleJoin = () => {
    // Check if event is live before allowing join
    if (event.status === "upcoming") {
      console.log("Event is upcoming");
      setShowModal(true);
    }else if(event.status === "cancelled") {
      toast.info("This event cancelled");
      return;
    } else {
      if (event.roomName) {
        navigate("/meeting", {
          state: {
            event: event,
          },
        });
      } else {
        alert("roomName not available for this event.");
      }
    }
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      {/* Upcoming Alert model */}
      {showModal ? <UpcomingAlert setShowModal={setShowModal} /> : null}
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
              <span
                className={`px-3 py-1 ${
                  event.is_paid
                    ? "bg-purple-100 text-purple-800"
                    : "bg-green-100 text-green-800"
                } rounded-full text-sm font-medium`}
              >
                {event.is_paid ? "Paid" : "Free"}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.status === "upcoming"
                    ? "bg-yellow-100 text-yellow-800"
                    : event.status === "live"
                    ? "bg-green-100 text-green-800"
                    : event.status === "completed"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>

            <p className="text-gray-600 text-lg mb-4">By {organizerName}</p>
            <p className="text-gray-700 text-lg mb-6">{event.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Event Details
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-700">{formattedDate}</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      {formattedTime} ({event.duration} minutes)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">{formattedPrice}</span>
                  </li>
                  {/* Add Attendees Count */}
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                    <span className="text-gray-700">
                      {attendeesCount} attendees
                    </span>
                  </li>
                </ul>
              </div>
              {event.status === "live" || event.status === "upcoming" ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How to Join
                  </h3>
                  {event.attendees.includes(user?.id) ? (
                    <>
                      <p className="text-gray-700 mb-4">
                        Join us live via the streaming link below:
                      </p>
                      <button
                        onClick={handleJoin}
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                      >
                        Join Event
                      </button>
                    </>
                  ) : (
                    <p className="text-gray-700 mb-4">
                      Register now to attend this event:
                    </p>
                  )}
                </div>
              ) : event.status === "cancelled" ? (
                <div className="bg-red-50 p-4 rounded-lg h-30">
                  <h3 className="text-lg font-semibold text-red-800 ">
                    Event Cancelled
                  </h3>
                  <p className="text-red-600">
                    This event has been cancelled by the organizer.
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg h-30">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Event Completed
                  </h3>
                  <p className="text-gray-600">
                    This event has already taken place.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate("/events")}
                  className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition duration-300"
                >
                  Back to Events
                </button>
                <p>
                  {event.attendees.includes(user?.id) ? (
                    <div className="flex items-center text-green-600 font-medium">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span>Registered</span>
                    </div>
                  ) : event.is_paid ? (
                    <button
                      onClick={handleRegister}
                      disabled={isCheckoutLoading}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-70"
                    >
                      {isCheckoutLoading
                        ? "Processing..."
                        : "Pay & Register Now"}
                    </button>
                  ) : (
                    <button
                    disabled={regiterLoading}
                      onClick={handleRegister}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      {regiterLoading
                        ? "Processing..."
                        : "Register Now"}
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
