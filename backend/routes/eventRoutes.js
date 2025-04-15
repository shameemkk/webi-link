const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const isOrganizer = require('../middleware/isOrganizer');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

// Routes
router.post('/', protect, createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', protect, isOrganizer, updateEvent);
router.delete('/:id', protect, isOrganizer, deleteEvent);

module.exports = router;