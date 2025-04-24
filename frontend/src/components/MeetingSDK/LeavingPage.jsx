import { useNavigate,useParams } from "react-router-dom";
import {useEndMeetingMutate} from "../../hooks/useEventData";
import { toast } from 'react-toastify';
import { useAuth } from "../../context/AuthContext";

const LeavingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate: endMeeting, isLoading: endMeetingLoading } =useEndMeetingMutate();
  const {user} =useAuth();
  const handleComplete =()=>{
    endMeeting(
      { roomName : id, status : 'completed' },
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
              error.response?.data?.message || "Failed to mark event";
            toast.error(errorMessage);
          }
        },
        onSuccess: () => {
          toast.success("Marking completed..");
          navigate("/dashboard")
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 text-center transition-all duration-300 hover:shadow-xl">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-4">You have left the meeting</h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8 mx-auto">
            Thank you for participating. We hope you had a productive session! If you would like to rejoin a meeting, please visit your dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 shadow-md hover:shadow-lg"
          >
            Return to Home
          </button>
          {
            user.role === "Organizer" ? <button
            disabled={endMeetingLoading}
              onClick={handleComplete}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium transition-all duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 shadow-md hover:shadow-lg"
            >
              {endMeetingLoading ? 'Marking...' : 'Mark as Completed'}
            
            </button>:null
          }
          
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-500">© {new Date().getFullYear()} WebiLink</p>
    </div>
  )
}

export default LeavingPage
