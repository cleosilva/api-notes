import express from 'express';
import { register, login } from '../controllers/userController.mjs';


const router = express.Router();

router.post('/register', register)

export default router;