import { Router } from 'express';
import { 
	save, 
	saveBookCategory, 
	update,
	updateBookCategory,
	getAllBookCategory, 
	getById,
	getByIdBookCategory,
	deleteCategory,
	deleteBookCategory,
	getAllCategories
} from '../controllers/category.controller.js';

const router = Router();

router.get('', getAllCategories);
router.get('/books', getAllBookCategory);

router.get('/:id', getById);
router.get('/books/:id', getByIdBookCategory);

router.post('', save);
router.post('/books', saveBookCategory)

router.put('/:id', update);
router.put('/books/:id', updateBookCategory);

router.delete('/:id', deleteCategory);
router.delete('/books/:id', deleteBookCategory);

export default router;