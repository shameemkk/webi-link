import React from 'react'
const EventStartTimeAlert = ({setShowModal, timeMessage, onStartNow}) => {
    return (
        <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-100">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl max-w-md w-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Status</h3>
                <p className="text-gray-600 mb-6">
                  {timeMessage || "This event is not live yet. Please wait until the scheduled time. You can view your registered event details in your dashboard."}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={onStartNow}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
                  >
                    Start Now
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
        </>
      );
}

export default EventStartTimeAlert
