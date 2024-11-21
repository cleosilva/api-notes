import express from 'express';
import { createTag, deleteTag, getTagById, getTags, updateTag } from '../controllers/tagController.mjs';
import { authenticateJWT } from '../middlewares/auth.mjs';

const router = express.Router();

router.post('/', authenticateJWT, createTag);
router.get('/', authenticateJWT, getTags);
router.get('/tags/:id', authenticateJWT, getTagById);
router.put('/tags/:id', authenticateJWT, updateTag);
router.delete('/tags/:id', authenticateJWT, deleteTag);

export default router;
