import { useState } from "react";
import EventModal from "../Events/EventModal";
import { useEventDataList, useEventDataMutate ,useEventUpdateMutate} from "../../hooks/useEventData";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

// Sample events data
export default function OrganizerDashboard() {
  const { data: events = [], isLoading: eventsLoading , refetch} = useEventDataList();
  const { mutate: createEvent, isLoading: createLoading } =useEventDataMutate();
  const { mutate: updateEvent, isLoading: updateLoading } =useEventUpdateMutate();
  const { user, checkAuth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Webinar",
    is_paid: false,
    price: 0,
    start_datetime: "",
    duration: 60,
    streaming_link: "",
    status: "upcoming",
    organizer_id: "", // Added organizer_id field
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
        price: formData.is_paid ? parseFloat(formData.price) : 0,
        duration: parseInt(formData.duration),
        start_datetime: new Date(formData.start_datetime).toISOString(),
        organizer_id: user.id,
      };
      await createEvent(eventData, {
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
        price: formData.is_paid ? parseFloat(formData.price) : 0,
        duration: parseInt(formData.duration),
        start_datetime: new Date(formData.start_datetime).toISOString(),
        organizer_id: user.id,
      };
      const event = events[editingEvent];
      const eventId = event._id;
      await updateEvent({eventId,eventData}, {
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
      });
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
      streaming_link: "",
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
    if (confirm("Are you sure want to delete this Event?")){
      const event = events[index];
    const eventId = event._id;
    try {
     const response = await axios.delete(`api/events/${eventId}`)
    if(response.status == 200){
      toast.info(response.data.message || 'Event deleted successfully')
      refetch()
    }
    } catch (error) {
      toast.error('Request faild try Again')
    }
    }else{
      return;
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

  return (
    <div className="py-12 h-full bg-white overflow-scroll ">
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
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Event
          </button>
        </div>

        {events.length === 0 ? (
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
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span>
                        {event.is_paid ? `$${event.price.toFixed(2)}` : "Free"}
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
                      >
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect
                          x="1"
                          y="5"
                          width="15"
                          height="14"
                          rx="2"
                          ry="2"
                        ></rect>
                      </svg>
                      <span className="truncate">{event.streaming_link}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6 pt-2 border-t">
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-100 h-10 px-4 py-2"
                    onClick={() => handleEdit(index)}
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
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-100 h-10 px-4 py-2 text-red-500 hover:text-red-700  ml-auto"
                    onClick={() => handleDelete(index)}
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
