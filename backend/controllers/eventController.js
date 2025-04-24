const Event = require('../models/Event');

// Create a new event
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const regiterEvent = async (req, res) => {
  try {
    const {eventId} = req.body;
    const userId = req.userId; // Assuming userId is set in the request by auth middleware
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.organizer_id.equals(userId)) {
      return res.status(400).json({ message: 'Organizer cannot register for their own event' });
    }
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: 'User has already registered for this event' });
    }
    event.attendees.push(userId);
    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventsByOrganizer = async (req, res) => {
  try {
    const organizerId = req.userId; // Assuming userId is set in the request by auth middleware
    const events = await Event.find({ organizer_id: organizerId }).populate('organizer_id', 'name');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer_id', 'name');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get events registered by the current user (for user dashboard)
const getRegisteredEvents = async (req, res) => {
  try {
    const userId = req.userId; // request by auth middleware
    const events = await Event.find({ attendees: userId }).populate('organizer_id', 'name');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update Event Status And RoomName (start meeting)
const startMeeting = async (req, res) => {
  try {
    const eventId = req.params.id;
    const {roomName} = req.body;
    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    } 
    if (event.status === 'completed') {
      return res.status(400).json({ message: 'Event is already completed' }); 
    }else if (event.status === 'live') {
      return res.status(400).json({isStarted:true, message: 'Meeting is already started' });
    }
    event.roomName = roomName;
    event.status = 'live';
    const updatedEvent = await event.save();
    res.status(200).json({
      message: "Meeting started successfully",
      status: updatedEvent.status,
    });
  } catch (error) {
  res.status(500).json({ message: error.message });
}};

// update event status to completed or cancelled (ending event)
const endMeeting =async (req, res)=>{
  try {
    const userId = req.userId;
    const {roomName, status}=req.body;
    console.log(roomName,status)
    const event = await Event.findOne({roomName: roomName});
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.organizer_id.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied. Not the event organizer' });
    }
    event.status = status;
    const updatedEvent = await event.save();
    res.status(200).json({
      message: "Meeting Ended...",
      status: updatedEvent.status,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createEvent,
  regiterEvent,
  getEventsByOrganizer,
  getRegisteredEvents, 
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  startMeeting,
  endMeeting
};