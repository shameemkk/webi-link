import React from 'react';

const EventModal = ({ isOpen, onClose,onUpdate, onSubmit, editingEvent, formData, handleInputChange, handleSelectChange, handleCheckboxChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-y-auto">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 sm:max-w-[550px] max-h-[90vh] overflow-y-auto w-full mx-4">
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editingEvent !== null ? "Edit Event" : "Add New Event"}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (editingEvent !== null) {
            onUpdate();
          } else {
            onSubmit();
          }
        }} className="p-6 space-y-6">
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
                min="1"
                value={formData.duration}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editingEvent !== null ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;