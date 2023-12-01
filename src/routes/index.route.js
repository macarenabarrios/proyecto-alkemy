import {Router} from 'express';
import userRouter from './user.route.js';
import authRouter from './auth.route.js';
import loanRouter from './loan.route.js';
import publisherRouter from './publisher.route.js';
import authorRouter from './author.route.js';
import bookRouter from './book.route.js';
import reviewRouter from './review.route.js';
import categoryRouter from './category.routes.js'

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/book', bookRouter);
router.use('/loans', loanRouter);
router.use('/publisher', publisherRouter);
router.use('/review', reviewRouter);
router.use('/author', authorRouter);
router.use('/book', bookRouter);
router.use('/categories', categoryRouter)

export default router;