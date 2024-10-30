import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.mjs';
import { authenticateJWT } from '../middlewares/auth.mjs';

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Study Node.js"
 *               description:
 *                 type: string
 *                 example: "Complete the Node.js API project"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-11-01"
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                 _id:
 *                   type: string
 *                   example: "someUniqueId"
 *       400:
 *         description: Requisição inválida
 *       403:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.post('/', authenticateJWT, createTask);
router.get('/', authenticateJWT, getTasks);
router.put('/:id', authenticateJWT, updateTask);
router.delete('/:id', authenticateJWT, deleteTask);

export default router;