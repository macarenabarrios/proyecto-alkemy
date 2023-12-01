import {Router} from 'express';
import { authorController } from '../controllers/author.controller.js';


const router = Router();

router.get('/:id', authorController.findById);

export default router;