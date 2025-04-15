import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your One-Stop Platform for Online Events
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Host and join workshops, classes, webinars, and more. Connect with your audience through engaging online experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-50 transition duration-300">
                Host an Event
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white/10 transition duration-300">
                Browse Events
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      W
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Web Development Workshop</h3>
                      <p className="text-gray-600">Starting in 2 days • 150 attendees</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      D
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Digital Marketing Masterclass</h3>
                      <p className="text-gray-600">Live now • 320 attendees</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">🎯</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;