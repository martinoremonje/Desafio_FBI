import express from 'express';
import { accessRestricted } from '../controllers/restrictedController.js';

const router = express.Router();

router.get('/', accessRestricted);

export default router;