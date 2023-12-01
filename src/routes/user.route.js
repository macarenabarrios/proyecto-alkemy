import { Router } from 'express';
import { deleteUser, getAll, getById, save, update } from '../controllers/user.controller.js';
import { hasAnyRole, isAccountOwner } from '../middleware/index.js';

const router = Router();

<<<<<<< HEAD

router.get('',hasAnyRole(["ADMIN"]), getAll);
router.get('/:id',isAccountOwner, hasAnyRole(["ADMIN", "USER"]), getById);
=======
router.get('', getAll);
router.get('/:id', hasAnyRole(["ADMIN", "USER"]), getById);
>>>>>>> cf4becd0f7a3886498218024120ce77d4f242205
router.post('', save);
router.put('/:id',isAccountOwner, update);
router.delete('/:id',isAccountOwner, deleteUser);

export default router;