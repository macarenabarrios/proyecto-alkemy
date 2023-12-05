import { Router } from 'express';
import { bookController } from '../controllers/book.controller.js';

const router = Router();

router.get('', bookController.getAll);
router.get('/id/:id', bookController.getById);
router.get('/available', bookController.availableBooks);
router.post('', bookController.newBook);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.deleteBook);

export default router;