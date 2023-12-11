import { Router } from 'express';
import { save, update, getAll, getById, deleteLoan, deleteAllLoans, returnBook, getLoanDetails } from '../controllers/loan.controller.js';
import { extractAuthenticated } from '../middleware/extract-authenticated.middleware.js';
import authorizeLoan from '../middleware/authorizeLoan.middleware.js';
const router = Router();

router.get('', getAll);
router.get('/:id', getById);
router.post('', save);
router.put('/:id', update);
router.delete('/:id', deleteLoan);
router.delete('/all/:idUser', deleteAllLoans);
router.post('/book/return', extractAuthenticated, returnBook);
router.get('/details/:id',authorizeLoan ,getLoanDetails);


export default router;