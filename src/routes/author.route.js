import {Router} from 'express';
import { authorController } from '../controllers/author.controller.js';


const router = Router();

router.get('/:id', authorController.findById);

router.post('/createAuthor', hasAnyRole(["ADMIN"]), authorController.createAuthor);

export default router;