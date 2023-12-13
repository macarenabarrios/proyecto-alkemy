import { Router } from 'express';
import authRouter from './auth.route.js';
import authorRouter from './author.route.js';
import bookRouter from './book.route.js';
import categoryRouter from './category.routes.js';
import loanRouter from './loan.route.js';
import publisherRouter from './publisher.route.js';
import reviewRouter from './review.route.js';
import userRouter from './user.route.js';
import { hasAnyRole } from '../middleware/auth.middleware.js';


import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const router = Router();

router.use('/auth', authRouter);
router.use('/author', hasAnyRole(["ADMIN", "USER"]), authorRouter);
router.use('/book', hasAnyRole(["ADMIN", "USER"]), bookRouter);
router.use('/categories', hasAnyRole(["ADMIN", "USER"]), categoryRouter);
router.use('/loans', hasAnyRole(["ADMIN", "USER"]), loanRouter);
router.use('/publisher', hasAnyRole(["ADMIN", "USER"]), publisherRouter);
router.use('/review', hasAnyRole(["ADMIN", "USER"]), reviewRouter);
router.use('/users', userRouter);

router.use('/index', (req, res) => {
	const currentModulePath = fileURLToPath(import.meta.url);
	const currentDirPath = dirname(currentModulePath);
	const chatFilePath = path.resolve(currentDirPath, '../public/index.html');
	res.sendFile(chatFilePath);
});

export default router;