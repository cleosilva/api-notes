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
 *   get:
 *     summary: Lista todas as tarefas
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Uma lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   dueDate:
 *                     type: string
 *                   _id:
 *                     type: string
 *                     example: "someUniqueId"
 *       403:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 * 
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Study Java"
 *               description:
 *                 type: string
 *                 example: "Complete the Java API project"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-11-02"
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
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
 *       404:
 *         description: Tarefa não encontrada
 *       403:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 *   delete:
 *     summary: Deleta uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa a ser deletada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *       404:
 *         description: Tarefa não encontrada
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