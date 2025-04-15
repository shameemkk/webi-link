import React, { useState } from 'react';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const events = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      category: 'Workshop',
      price: 'Paid',
      date: 'Oct 15, 2023',
      instructor: 'Sarah Johnson',
      attendees: 75,
      image: '🖥️',
    },
    {
      id: 2,
      title: 'Business Leadership Summit',
      category: 'Conference',
      price: 'Free',
      date: 'Oct 18, 2023',
      instructor: 'Michael Chen',
      attendees: 200,
      image: '👔',
    },
    {
      id: 3,
      title: 'Digital Art Masterclass',
      category: 'Class',
      price: 'Paid',
      date: 'Oct 20, 2023',
      instructor: 'Emma Davis',
      attendees: 50,
      image: '🎨',
    },
    {
      id: 4,
      title: 'Web Security Fundamentals',
      category: 'Workshop',
      price: 'Paid',
      date: 'Oct 25, 2023',
      instructor: 'John Smith',
      attendees: 60,
      image: '🔒',
    },
    {
      id: 5,
      title: 'UX Design Principles',
      category: 'Class',
      price: 'Free',
      date: 'Oct 30, 2023',
      instructor: 'Lisa Wong',
      attendees: 85,
      image: '🎯',
    },
  ];

  const categories = ['All', ...new Set(events.map(event => event.category))];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and join amazing events from our community
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search events or instructors..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full ${selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'}
                hover:shadow-md transition duration-300`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No events found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 flex justify-center items-center">
                  <span className="text-6xl">{event.image}</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                    <span className={`px-3 py-1 ${event.price === 'Free' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'} rounded-full text-sm font-medium`}>
                      {event.price}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">By {event.instructor}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{event.date}</span>
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;