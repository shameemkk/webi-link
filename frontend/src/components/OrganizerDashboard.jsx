
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext";


 
// Sample events data
const sampleEvents = [
  {
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript in this beginner-friendly webinar.",
    category: "Webinar",
    event_type: "live",
    is_paid: false,
    price: 0,
    start_datetime: new Date("2023-12-15T18:00:00"),
    duration: 60,
    streaming_link: "https://zoom.us/j/123456789",
    status: "upcoming",
  },
  {
    title: "Advanced React Patterns",
    description: "Deep dive into advanced React patterns and performance optimization techniques.",
    category: "Workshop",
    event_type: "live",
    is_paid: true,
    price: 49.99,
    start_datetime: new Date("2023-12-20T15:00:00"),
    duration: 120,
    streaming_link: "https://zoom.us/j/987654321",
    status: "upcoming",
  },
  {
    title: "UX Design Fundamentals",
    description: "Learn the core principles of user experience design and how to apply them to your projects.",
    category: "Conference",
    event_type: "recorded",
    is_paid: true,
    price: 29.99,
    start_datetime: new Date("2023-12-10T14:00:00"),
    duration: 90,
    streaming_link: "https://vimeo.com/123456789",
    status: "completed",
  },
]

export default function OrganizerDashboard() {
  const { loading, fetchEvents } = useAuth();
  const [events, setEvents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Webinar",
    event_type: "live",
    is_paid: false,
    price: 0,
    start_datetime: "",
    duration: 60,
    streaming_link: "",
    status: "upcoming",
  })

  useEffect(() => {
    setEvents(sampleEvents)
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      is_paid: checked,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newEvent = {
      ...formData,
      start_datetime: new Date(formData.start_datetime),
      price: Number.parseFloat(formData.price),
      duration: Number.parseInt(formData.duration),
    }

    if (editingEvent !== null) {
      const updatedEvents = events.map((event, index) => (index === editingEvent ? newEvent : event))
      setEvents(updatedEvents)
    } else {
      setEvents([...events, newEvent])
    }

    setIsModalOpen(false)
    setEditingEvent(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Webinar",
      event_type: "live",
      is_paid: false,
      price: 0,
      start_datetime: "",
      duration: 60,
      streaming_link: "",
      status: "upcoming",
    })
  }

  const handleEdit = (index) => {
    const event = events[index]
    setFormData({
      ...event,
      start_datetime: new Date(event.start_datetime).toISOString().slice(0, 16),
    })
    setEditingEvent(index)
    setIsModalOpen(true)
  }

  const handleDelete = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index)
    setEvents(updatedEvents)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
      case "live":
        return "bg-rose-100 text-rose-800 hover:bg-rose-200"
      case "completed":
        return "bg-slate-100 text-slate-800 hover:bg-slate-200"
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-200"
    }
  }

  return (
    <div className="py-12 h-full bg-white overflow-scroll ">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Organizer Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your events and track their performance</p>
            
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 h-10 px-4 py-2 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add New Event
          </button>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-slate-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold">No events yet</h3>
            <p className="mt-2 text-sm text-gray-500">Get started by creating your first event</p>
            <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
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
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${getStatusColor(event.status)}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 ml-2">
                      {event.event_type === "live" ? "Live Event" : "Recorded"}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold leading-none tracking-tight mt-2 line-clamp-1">{event.title}</h3>
                </div>
                <div className="p-6 pt-0 pb-4">
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{event.description}</p>

                  <div className="grid gap-3">
                    <div className="flex items-center text-sm">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 mr-2">
                        {event.category}
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-gray-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      <span>{new Date(event.start_datetime).toLocaleDateString()}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-3 mr-2 h-4 w-4 text-gray-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      <span>
                        {new Date(event.start_datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-gray-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      <span>{event.duration} minutes</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-gray-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      <span>{event.is_paid ? `$${event.price.toFixed(2)}` : "Free"}</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-gray-500"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                      <span className="truncate">{event.streaming_link}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6 pt-2 border-t">
                  <button 
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-100 h-10 px-4 py-2"
                    onClick={() => handleEdit(index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    Edit
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-100 h-10 px-4 py-2 text-red-500 hover:text-red-700  ml-auto"
                    onClick={() => handleDelete(index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-y-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 sm:max-w-[550px] max-h-[90vh] overflow-y-auto w-full mx-4">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {editingEvent !== null ? "Edit Event" : "Add New Event"}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingEvent(null)
                    resetForm()
                  }}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input 
                      type="text" 
                      id="title" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                      required 
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                      <select 
                        id="category" 
                        value={formData.category} 
                        onChange={(e) => handleSelectChange("category", e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      >
                        <option value="Webinar">Webinar</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Conference">Conference</option>
                      </select>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="event_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Type</label>
                      <select 
                        id="event_type" 
                        value={formData.event_type} 
                        onChange={(e) => handleSelectChange("event_type", e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      >
                        <option value="live">Live</option>
                        <option value="recorded">Recorded</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="is_paid" 
                        checked={formData.is_paid} 
                        onChange={(e) => handleCheckboxChange(e.target.checked)} 
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="is_paid" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Paid Event</label>
                    </div>
                  </div>

                  {formData.is_paid && (
                    <div className="grid gap-2">
                      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price ($)</label>
                      <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                  )}

                  <div className="grid gap-2">
                    <label htmlFor="start_datetime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date & Time</label>
                    <input
                      id="start_datetime"
                      name="start_datetime"
                      type="datetime-local"
                      value={formData.start_datetime}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration (minutes)</label>
                    <input
                      id="duration"
                      name="duration"
                      type="number"
                      min="15"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="streaming_link" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Streaming Link</label>
                    <input
                      id="streaming_link"
                      name="streaming_link"
                      type="url"
                      value={formData.streaming_link}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                    <select 
                      id="status" 
                      value={formData.status} 
                      onChange={(e) => handleSelectChange("status", e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="live">Live</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center pt-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 justify-end">
                  <button
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => {
                      setIsModalOpen(false)
                      setEditingEvent(null)
                      resetForm()
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {editingEvent !== null ? "Update Event" : "Create Event"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}