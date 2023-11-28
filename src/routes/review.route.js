import { Router } from 'express';
import { reviewController } from '../controllers/review.controller.js'

const router = Router();

router.post('/create', reviewController.newReview);
router.get('', reviewController.getAll);
router.get('/getbyid/:id', reviewController.getById);
router.get('/getbybook/:id', reviewController.getByBook);
router.get('/getbyuser/:id', reviewController.getByUser);
router.get('/getdeleted', reviewController.getDeletedReviews);
router.put('/update/:id', reviewController.update);
router.delete('/delete/:id', reviewController.deleteReview);

export default router;