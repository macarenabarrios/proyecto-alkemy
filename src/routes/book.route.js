import { Router } from 'express';
import { bookController } from '../controllers/book.controller.js';
import { validateBookData } from '../middleware/validateBookData.js';

const router = Router();

router.get('', bookController.getAll);
router.get('/id/:id', bookController.getById);
router.get('/available', bookController.availableBooks);
router.post('', validateBookData, bookController.newBook);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.deleteBook);
router.get('/author-title', bookController.getByAuthorOrTitle);
router.get('/export-csv', bookController.exportCSV);

export default router;