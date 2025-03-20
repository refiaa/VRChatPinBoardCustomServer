import { Router } from 'express';
import noteController from '../controllers/note.controller';

const router = Router();

router.get('/addnotev3', noteController.addNote);
router.get('/getnotesv3', noteController.getNotes);

export default router;