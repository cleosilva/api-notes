import express from 'express';
import { createTask } from '../controllers/taskController.mjs';
import { authenticateJWT } from '../middlewares/auth.mjs';

const router = express.Router();


router.post('/', authenticateJWT, createTask);

export default router;