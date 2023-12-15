import { eventRepository } from '../repositories/event.repository.js';

const createEvent = async (eventData) => {
  return eventRepository.createEvent(eventData);
};

const updateEvent = async (eventId, eventData) => {
  return eventRepository.updateEvent(eventId, eventData);
};

const deleteEvent = async (eventId) => {
  return eventRepository.deleteEvent(eventId);
};

const getEventById = async (eventId) => {
  return eventRepository.getEventById(eventId);
};
const getAllEvents = async () => {
  return eventRepository.getAllEvents();
};

export const eventService = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
};