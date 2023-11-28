import {Router} from 'express';
import userRouter from './user.route.js'
import authRouter from './auth.route.js'
import loanRouter from './loan.route.js'
import publisherRouter from './publisher.route.js'
import bookRouter from './book.route.js'

const router = Router();

router.use('/users',userRouter);
router.use('/auth',authRouter);
router.use('/loans', loanRouter);
router.use('/publisher', publisherRouter);
router.use('/book', bookRouter);

export default router;