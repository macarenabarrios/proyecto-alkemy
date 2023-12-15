import { Router } from 'express';
import { eventController } from '../controllers/event.controller.js';

const router = Router();

router.post('/', eventController.createEvent);
router.put('/:eventId', eventController.updateEvent);
router.delete('/:eventId', eventController.deleteEvent);
router.get('/', eventController.getAllEvents);
router.get('/:eventId', eventController.getEventById);

export default router;