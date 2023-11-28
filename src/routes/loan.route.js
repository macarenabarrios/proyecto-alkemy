import { Router } from 'express';
import { save, update, getAll, getById, deleteLoan } from '../controllers/loan.controller.js';

const router = Router();

router.post('', save);
router.get('', getAll);
router.get('/:id', getById);

export default router;