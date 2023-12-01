import { Router } from 'express';
import { deleteUser, getAll, getById, save, update } from '../controllers/user.controller.js';
import { hasAnyRole, isAccountOwner } from '../middleware/index.js';

const router = Router();


router.get('',hasAnyRole(["ADMIN"]), getAll);
router.get('/:id',isAccountOwner, hasAnyRole(["ADMIN", "USER"]), getById);
router.post('', save);
router.put('/:id',isAccountOwner, update);
router.delete('/:id',isAccountOwner, deleteUser);

export default router;