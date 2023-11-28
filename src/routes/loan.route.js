import { Router } from 'express';
import { save, update, getAll, getById, deleteLoan } from '../controllers/loan.controller.js';

const router = Router();

router.get('', getAll);
router.get('/:id', getById);
router.post('', save);
router.put('/:id', update);
router.delete('/:id', deleteLoan);

export default router;