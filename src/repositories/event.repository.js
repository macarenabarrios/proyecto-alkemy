import Event from '../db/models/event.model.js';

const createEvent = async (eventData) => {
  try {
    const newEvent = await Event.create(eventData);
    return newEvent;
  } catch (error) {
    console.error('Repository error when creating a new event:', error);
    throw new Error('Error creating a new event');
  }
};

const updateEvent = async (eventId, eventData) => {
  try {
    const [updatedRowCount] = await Event.update(eventData, {
      where: { id: eventId },
    });

    if (updatedRowCount === 0) {
      return null; // No se actualizó ninguna fila
    }

    const updatedEvent = await Event.findByPk(eventId);
    return updatedEvent;
  } catch (error) {
    console.error(`Repository error when updating event with ID ${eventId}:`, error);
    throw new Error(`Error updating event with ID ${eventId}`);
  }
};

const deleteEvent = async (eventId) => {
  try {
    const deletedRowCount = await Event.destroy({
      where: { id: eventId },
    });

    if (deletedRowCount === 0) {
      return false; // No se eliminó ninguna fila
    }

    return true;
  } catch (error) {
    console.error(`Repository error when deleting event with ID ${eventId}:`, error);
    throw new Error(`Error deleting event with ID ${eventId}`);
  }
};

const getEventById = async (id) => {
  try {
    const response = await Event.findOne({
      where: { id },
    });
    return response;
  } catch (error) {
    console.error("Repository error getting event by ID:", error);
    throw new Error("Error getting event by ID");
  }
};

const getAllEvents = async () => {
  try {
    const events = await Event.findAll();
    return events;
  } catch (error) {
    console.error(
      "Repository error getting all events:",
      error
    );
    throw new Error("Error getting event list");
  }
};

export const eventRepository = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
};