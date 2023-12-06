import { Router } from 'express';
import { bookController } from '../controllers/book.controller.js';

const router = Router();

router.post('/create', bookController.newBook);
router.delete('/delete/:id', bookController.deleteBook);
router.get('', bookController.getAll);
router.get('/getbyid/:id', bookController.getById);
router.put('/update/:id', bookController.update);
router.get('/author-title', bookController.getByAuthorOrTitle);

export default router;