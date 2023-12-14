import { Router } from 'express';
import { libraryController } from '../controllers/library.controller.js';


const router = Router();

router.post('/', libraryController.createLibrary);
router.get('/:libraryId', libraryController.getLibraryById);
router.post('/:libraryId/add-book/:bookId', libraryController.addBookToLibrary);

export default router;