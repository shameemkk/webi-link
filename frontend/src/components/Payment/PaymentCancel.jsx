import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PaymentCancel() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventTitle = searchParams.get('title') || 'the event';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Payment Cancelled
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your payment for {eventTitle} was cancelled.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <button
              onClick={() => {
                toast.info('Redirecting to events page...');
                navigate('/events');
              }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Browse Other Events
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}