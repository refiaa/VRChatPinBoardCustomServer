import { Router } from 'express';
import pinboardController from '../controllers/pinboard.controller';

const router = Router();

router.get('/addpinboardv3', pinboardController.createPinboard);

export default router;