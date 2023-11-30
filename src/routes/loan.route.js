import { Router } from 'express';
import { save, update, getAll, getById, deleteLoan, deleteAllLoans } from '../controllers/loan.controller.js';

const router = Router();

router.get('', getAll);
router.get('/:id', getById);
router.post('', save);
router.put('/:id', update);
router.delete('/:id', deleteLoan);
router.delete('/all/:idUser', deleteAllLoans);

export default router;