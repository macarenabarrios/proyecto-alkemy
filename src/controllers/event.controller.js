import { eventService } from '../services/event.service.js';

const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = await eventService.createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const eventData = req.body;
    const updatedEvent = await eventService.updateEvent(eventId, eventData);

    if (updatedEvent) {
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const deleted = await eventService.deleteEvent(eventId);

    if (deleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await eventService.getEventById(eventId);

    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const eventController = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
};
