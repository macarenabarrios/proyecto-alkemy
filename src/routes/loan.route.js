import { Router } from 'express';
import { save, update, getAll, getById, deleteLoan, deleteAllLoans, returnBook, getByUserId } from '../controllers/loan.controller.js';
import { extractAuthenticated } from '../middleware/extract-authenticated.middleware.js';
const router = Router();

router.get('', getAll);
router.get('/:id', getById);
router.get('/users/:id', getByUserId);
router.post('', save);
router.put('/:id', update);
router.delete('/:id', deleteLoan);
router.delete('/all/:idUser', deleteAllLoans);
router.post('/book/return', extractAuthenticated, returnBook);

export default router;