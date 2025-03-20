import { Router } from 'express';
import pinboardRoutes from './pinboard.routes';
import noteRoutes from './note.routes';

const router = Router();

router.use('/', pinboardRoutes);
router.use('/', noteRoutes);

export default router;