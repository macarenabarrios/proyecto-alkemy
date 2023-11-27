import { Router } from 'express';
import { publisherController } from '../controllers/publisher.controller.js'

const router = Router();

router.post('/create', publisherController.newPublisher);
router.get('', publisherController.getAll);
router.get('/getbyid/:id', publisherController.getById);
router.get('/getdeleted', publisherController.getDeletedPublishers);
router.put('/update/:id', publisherController.update);
router.delete('/delete/:id', publisherController.deletePublisher);

export default router;