import React, { useState } from 'react';
import EventModal from '../components/Events/EventModal';
import { useEventDataMutate, useEventDataList } from '../hooks/useEventData';

const Events = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Webinar',
    event_type: 'live',
    is_paid: false,
    price: 0,
    start_datetime: '',
    duration: 60,
    streaming_link: ''
  });

  const { mutate: createEvent, isLoading } = useEventDataMutate();
  const { data: events } = useEventDataList();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      is_paid: checked,
      price: checked ? prev.price : 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        ...formData,
        price: formData.is_paid ? parseFloat(formData.price) : 0,
        duration: parseInt(formData.duration),
        start_datetime: new Date(formData.start_datetime).toISOString()
      };
      console.log(eventData);
      await createEvent(eventData);
      setIsModalOpen(false);
      setFormData({
        title: '',
        description: '',
        category: 'Webinar',
        event_type: 'live',
        is_paid: false,
        price: 0,
        start_datetime: '',
        duration: 60,
        streaming_link: ''
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Event'}
          </button>
        </div>

        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
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
};

export default Events;