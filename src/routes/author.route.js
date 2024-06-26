import { Router } from 'express';
import { authorController } from '../controllers/author.controller.js';
import { hasAnyRole } from '../middleware/index.js';

const router = Router();

router.get('/authors', authorController.getAllAuthors);
router.get('/:id', authorController.findById);

router.post('/createAuthor', hasAnyRole(["ADMIN"]), authorController.createAuthor);

export default router;