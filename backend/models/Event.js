const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 255,
  },
  description: {
    type: String,
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  category: {
    type: String,
    enum : ['Webinar', 'Workshop','Conference'],
    maxlength: 100,
    required: true,
  },
  is_paid: {
    type: Boolean,
    default: false,
    required: true,
  },
  price: {
    type: Number,
    default: 0.0,
  },
  start_datetime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    min: 0,
  },
  streaming_link: {
    type: String,
  },
  cover_image: {
    type: String,
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed', 'cancelled'],
    default: 'upcoming',
  },
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;