import { Router } from 'express';
import { backup } from '../controllers/admin.controller.js';
import { hasAnyRole } from '../middleware/index.js';

const router = Router();

router.get('/backup',hasAnyRole(["ADMIN"]), backup);

export default router;