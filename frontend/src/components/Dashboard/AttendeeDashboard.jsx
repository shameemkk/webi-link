import { useRegisteredEventList } from "../../hooks/useEventData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function AttendeeDashboard() {
  const navigate = useNavigate();
  const { data: events = [], isLoading: eventsLoading, refetch, isError } = useRegisteredEventList();
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

  const handleJoinEvent = (roomName, status, index) => {
    if (status === "upcoming") {
      toast.info("This event hasn't started yet");
      return;
    }else if(status === "cancelled") {
      toast.info("This event cancelled");
      return;
    }
      if (index) {
        navigate("/meeting", {
          state: {
            event: events[index],
          },
        });
      }
  };

  return (
    <div className="py-12 h-full bg-white overflow-scroll">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              My Registered Events
            </h1>
            <p className="text-gray-500 mt-1">
              View and join your registered events
            </p>
          </div>
        </div>

        {eventsLoading ? (
          <div className="flex justify-center items-center p-12">
            <p className="text-gray-500">Loading events...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-red-50 border border-red-200 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-semibold text-red-700">Error Fetching Data</h3>
            <p className="mt-1 text-sm text-red-600">
              There was a problem retrieving your events. Please try again.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.357-2a8.001 8.001 0 0115.357-2m0 0H15" />
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
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold">No registered events</h3>
            <p className="mt-2 text-sm text-gray-500">
              You haven't registered for any events yet
            </p>
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

                    
                  </div>
                </div>
                <div className="flex items-center p-6 pt-2 border-t">
                  
                      <button
                      disabled={event.status === "upcoming" || event.status === "completed" || event.status ==="cancelled"}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 h-10 px-4 py-2 text-white w-full"
                    onClick={() => handleJoinEvent(event.roomName, event.status ,index)}
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
                    Join Event
                  </button>
                    
                  
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}