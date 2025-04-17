const Event = require('../models/Event');
const User = require('../models/User');

const isOrganizer = async (req, res, next) => {
  try {
    const userId = req.userId;
    const event = await User.findById({_id: userId , rolw: "Organizer"});
    if (!event) {
      return res.status(403).json({ message: 'Access denied. Not an organizer' }); 
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' }); 
  }
}

const isOrganizerEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const userId = req.userId;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.organizer_id.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied. Not the event organizer' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {isOrganizerEvent, isOrganizer};