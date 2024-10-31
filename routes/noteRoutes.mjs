import express from 'express';
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/noteController.mjs';
import { authenticateJWT } from '../middlewares/auth.mjs';

const router = express.Router();

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Cria uma nova nota
 *     tags: [Notes]
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
 *                 example: "Revisão de JavaScript"
 *               content:
 *                 type: string
 *                 example: "Estudar closures e promises"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["estudo", "javascript"]
 *               color:
 *                 type: string
 *                 example: "#FFDDC1"
 *               checklist:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     item:
 *                       type: string
 *                       example: "Entender async/await"
 *                     done:
 *                       type: boolean
 *                       example: false
 *     responses:
 *       201:
 *         description: Nota criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 color:
 *                   type: string
 *                 checklist:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       item:
 *                         type: string
 *                       done:
 *                         type: boolean
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
router.post('/', authenticateJWT, createNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Retorna todas as notas do usuário
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   color:
 *                     type: string
 *                   checklist:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         item:
 *                           type: string
 *                         done:
 *                           type: boolean
 *                   _id:
 *                     type: string
 *                     example: "someUniqueId"
 *       403:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */

router.get('/', authenticateJWT, getNotes);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Atualiza uma nota existente
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da nota a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               color:
 *                 type: string
 *               checklist:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     item:
 *                       type: string
 *                     done:
 *                       type: boolean
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso
 *       404:
 *         description: Nota não encontrada
 *       403:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.put('/:id', authenticateJWT, updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Exclui uma nota existente
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da nota a ser excluída
 *     responses:
 *       200:
 *         description: Nota excluída com sucesso
 *       404:
 *         description: Nota não encontrada
 *       403:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/:id', authenticateJWT, deleteNote);

export default router;