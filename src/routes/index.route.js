import { Router } from 'express';
import userRouter from './user.route.js'
import authRouter from './auth.route.js'
import publisherRouter from './publisher.route.js'
import authorRouter from './author.route.js'

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/publisher', publisherRouter);
router.use('/author', authorRouter);

export default router;