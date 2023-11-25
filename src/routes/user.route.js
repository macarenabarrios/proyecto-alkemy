import {Router} from 'express';
import { deleteUser, getAll, getById,save,update } from '../controllers/user.controller.js';

const router = Router();


router.get('',getAll);
router.get('/:id',getById);
router.post('',save);
router.put('/:id',update);
router.delete('/:id',deleteUser);

export default router;