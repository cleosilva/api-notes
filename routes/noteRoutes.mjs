import express from 'express';
import { createNote, deleteNote, getNotes, toggleArchiveNote, updateNote } from '../controllers/noteController.mjs';
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
 *     summary: Obtém as notas do usuário com filtros opcionais
 *     description: Retorna uma lista de notas que pertencem ao usuário autenticado. Filtros opcionais permitem busca por título, tags e status de checklist.
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filtro pelo título da nota (busca parcial, insensível a maiúsculas/minúsculas).
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Filtro por tag específica.
 *       - in: query
 *         name: done
 *         schema:
 *           type: boolean
 *         description: Filtro por status do checklist (true para concluído, false para não concluído).
 *     responses:
 *       200:
 *         description: Lista de notas do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       403:
 *         description: Usuário não autorizado (token inválido ou não fornecido).
 *       500:
 *         description: Erro interno do servidor.
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

/**
 * @swagger
 * /notes/{id}/archive:
 *   patch:
 *     summary: Arquiva ou desarquiva uma nota
 *     description: Atualiza o status de arquivamento de uma nota específica para o usuário autenticado.
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da nota a ser arquivada ou desarquivada.
 *     responses:
 *       200:
 *         description: Status de arquivamento atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: ID de nota inválido ou outra entrada inválida.
 *       403:
 *         description: Usuário não autorizado.
 *       404:
 *         description: Nota não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */
router.patch('/:id/archive', authenticateJWT, toggleArchiveNote);

export default router;