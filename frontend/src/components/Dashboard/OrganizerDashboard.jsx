import { useState } from "react";
import EventModal from "../Events/EventModal";
import EventStartTimeAlert from "../Events/EventStartTimeAlert";
import {
  useEventDataList,
  useEventDataMutate,
  useEventUpdateMutate,
} from "../../hooks/useEventData";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OrganizerDashboard() {
  const {
    data: events = [],
    isLoading: eventsLoading,
    refetch,
    isError,
  } = useEventDataList();
  const { mutate: createEvent, isLoading: createLoading } =useEventDataMutate();
  const { mutate: updateEvent, isLoading: updateLoading } =useEventUpdateMutate();
  const { user, checkAuth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showTimeAlert, setShowTimeAlert] = useState(false);
  const [currentTimeMessage, setCurrentTimeMessage] = useState("");
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isEventStarting, setIsEventStarting] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Webinar",
    is_paid: false,
    price: 0,
    start_datetime: "",
    duration: 60,
    status: "upcoming",
    organizer_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      is_paid: checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      checkAuth();
      const eventData = {
        ...formData,
        price: formData.is_paid ? Number.parseFloat(formData.price) : 0,
        duration: Number.parseInt(formData.duration),
        start_datetime: new Date(formData.start_datetime).toISOString(),
        organizer_id: user.id,
      };
      createEvent(eventData, {
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
          toast.success("Event created successfully");
          setIsModalOpen(false);
          setEditingEvent(null);
          resetForm();
        },
      });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      checkAuth();
      const eventData = {
        ...formData,
        price: formData.is_paid ? Number.parseFloat(formData.price) : 0,
        duration: Number.parseInt(formData.duration),
        start_datetime: new Date(formData.start_datetime).toISOString(),
        organizer_id: user.id,
      };
      const event = events[editingEvent];
      const eventId = event._id;
      updateEvent(
        { eventId, eventData },
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
            toast.success("Event Updated successfully");
            setIsModalOpen(false);
            setEditingEvent(null);
            resetForm();
          },
        }
      );
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Webinar",
      is_paid: false,
      price: 0,
      start_datetime: "",
      duration: 60,
      status: "upcoming",
    });
  };

  const handleEdit = (index) => {
    const event = events[index];
    setFormData({
      ...event,
      start_datetime: new Date(event.start_datetime).toISOString().slice(0, 16),
    });
    setEditingEvent(index);
    setIsModalOpen(true);
  };

  const handleDelete = async (index) => {
    if (confirm("Are you sure want to delete this Event?")) {
      const event = events[index];
      const eventId = event._id;
      try {
        const response = await axios.delete(`api/events/${eventId}`);
        if (response.status == 200) {
          toast.info(response.data.message || "Event deleted successfully");
          refetch();
        }
      } catch (error) {
        toast.error("Request failed try Again");
      }
    } else {
      return;
    }
  };

  const handleStartEvent = (event) => {
    const eventTime = new Date(event.start_datetime);
    const currentTime = new Date();

    if (eventTime > currentTime) {
      // Calculate time difference
      const timeDiff = eventTime - currentTime;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      let timeMessage = "This event starts in ";
      if (days > 0) timeMessage += `${days} day${days > 1 ? "s" : ""} `;
      if (hours > 0) timeMessage += `${hours} hour${hours > 1 ? "s" : ""} `;
      if (minutes > 0)
        timeMessage += `${minutes} minute${minutes > 1 ? "s" : ""} `;

      setCurrentTimeMessage(timeMessage);
      setCurrentEvent(event);
      setShowTimeAlert(true);
    } else {
      setCurrentEvent(event);
      handleStartNow();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
      case "live":
        return "bg-rose-100 text-rose-800 hover:bg-rose-200";
      case "completed":
        return "bg-slate-100 text-slate-800 hover:bg-slate-200";
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-200";
    }
  };

  const isEventInFuture = (eventTime) => {
    return new Date(eventTime) > new Date();
  };

  const handleStartNow = () => {
    if (currentEvent) {
      navigate("/meeting", {
        state: {
          event: currentEvent,
        },
      });

      setShowTimeAlert(false);
    }
  };

  return (
    <div className="py-12 h-full bg-white overflow-auto">
      {showTimeAlert && (
        <EventStartTimeAlert
          setShowModal={setShowTimeAlert}
          timeMessage={currentTimeMessage}
          onStartNow={handleStartNow}
        />
      )}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Organizer Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your events and track their performance
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 h-10 px-4 py-2 text-white"
            aria-label="Add new event"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Event
          </button>
        </div>

        {eventsLoading ? (
          <div className="flex justify-center items-center p-12">
            <p className="text-gray-500">Loading events...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-red-50 border border-red-200 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-semibold text-red-700">
              Error Fetching Data
            </h3>
            <p className="mt-1 text-sm text-red-600">
              There was a problem retrieving your events. Please try again.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2"
              aria-label="Retry loading events"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.357-2a8.001 8.001 0 0115.357-2m0 0H15"
                />
              </svg>
              Retry
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10 text-slate-500"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold">No events yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Get started by creating your first event
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 mt-6"
              aria-label="Add event"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="rounded-lg border bg-white shadow-sm overflow-hidden border-slate-200 dark:border-slate-700 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex flex-col space-y-1.5 p-6 pb-3">
                  <div className="flex justify-between items-start">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${getStatusColor(
                        event.status
                      )}`}
                    >
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold leading-none tracking-tight mt-2 line-clamp-1">
                    {event.title}
                  </h3>
                </div>
                <div className="p-6 pt-0 pb-4">
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {event.description}
                  </p>

                  <div className="grid gap-3">
                    <div className="flex items-center text-sm">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 mr-2">
                        {event.category}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        Organizer: {event.organizer_id.name}
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-gray-500"
                        aria-hidden="true"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>
                        {new Date(event.start_datetime).toLocaleDateString()}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-3 mr-2 h-4 w-4 text-gray-500"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>
                        {new Date(event.start_datetime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-gray-500"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>{event.duration} minutes</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-gray-500"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span>
                        {event.is_paid ? `$${event.price.toFixed(2)}` : "Free"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center p-6 pt-2 border-t gap-2">
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-100 h-10 px-4 py-2"
                    onClick={() => handleEdit(index)}
                    aria-label="Edit event"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit
                  </button>
                        {
                          event.status !== 'completed' && event.status !== 'cancelled' && (
                            <button
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 border border-green-500 bg-green-50 hover:bg-green-100 h-10 px-4 py-2 text-green-700"
                              onClick={() => handleStartEvent(event)}
                              aria-label="Start event"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                                aria-hidden="true"
                              >
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                              </svg>
                              {isEventInFuture(event.start_datetime)
                                ? "Start Event"
                                : "Start Now"}
                            </button>
                          )
                        }
                  

                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-100 h-10 px-4 py-2 text-red-500 hover:text-red-700 ml-auto"
                    onClick={() => handleDelete(index)}
                    aria-label="Delete event"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <EventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEvent(null);
            resetForm();
          }}
          onUpdate={handleUpdate}
          onSubmit={handleSubmit}
          editingEvent={editingEvent}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
}
