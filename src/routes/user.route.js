import { Router } from 'express';
import { deleteUser, getAll, getById, save, update } from '../controllers/user.controller.js';
import { hasAnyRole } from '../middleware/auth.middleware.js';

const router = Router();


router.get('', getAll);
router.get('/:id', hasAnyRole(["ADMIN", "USER"]), getById);
router.post('', save);
router.put('/:id', update);
router.delete('/:id', deleteUser);

export default router;