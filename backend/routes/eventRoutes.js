const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const validateEvent = require('../middleware/validateEvent');
const {isOrganizer, isOrganizerEvent} = require('../middleware/isOrganizer');
const {
  createEvent,
  regiterEvent,
  getEventsByOrganizer,
  getRegisteredEvents, 
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

router.post('/', protect,isOrganizer, validateEvent, createEvent);
router.post('/registerEvent', protect, regiterEvent);
router.get('/getEventsByOrganizer', protect, getEventsByOrganizer);
router.get('/registered-events', protect, getRegisteredEvents); 
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', protect, isOrganizerEvent, updateEvent);
router.delete('/:id', protect, isOrganizerEvent, deleteEvent);

module.exports = router;