import express from 'express';
import { createTag, getTags } from '../controllers/tagController.mjs';
import { authenticateJWT } from '../middlewares/auth.mjs';

const router = express.Router();

router.post('/', authenticateJWT, createTag);
router.get('/', authenticateJWT, getTags);

export default router;
