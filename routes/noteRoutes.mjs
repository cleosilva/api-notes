import express from 'express';
import { createNote, deleteNote, getNotes, reorderNotes, setReminder, toggleArchiveNote, togglePinNote, updateNote, addChecklistItem, getChecklistItems, toggleChecklistItem, removeChecklistItem } from '../controllers/noteController.mjs';
import { authenticateJWT } from '../middlewares/auth.mjs';

const router = express.Router();

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Creates a new note
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
 *                 example: "JavaScript Review"
 *               content:
 *                 type: string
 *                 example: "Study closures and promises"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["study", "javascript"]
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
 *                       example: "Understand async/await"
 *                     done:
 *                       type: boolean
 *                       example: false
 *     responses:
 *       201:
 *         description: Note created successfully
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
 *         description: Invalid request
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', authenticateJWT, createNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Retrieves the user's notes with optional filters
 *     description: Returns a list of notes belonging to the authenticated user. Optional filters allow searching by title, tags, and checklist status.
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by the note's title (partial case-insensitive search).
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Filter by specific tag.
 *       - in: query
 *         name: done
 *         schema:
 *           type: boolean
 *         description: Filter by checklist status (true for completed, false for not completed).
 *     responses:
 *       200:
 *         description: List of user's notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       403:
 *         description: Unauthorized user (invalid or missing token).
 *       500:
 *         description: Internal server error.
 */
router.get('/', authenticateJWT, getNotes);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Updates an existing note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the note to be updated
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
 *         description: Note updated successfully
 *       404:
 *         description: Note not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put('/:id', authenticateJWT, updateNote);

/**
 * @swagger
 * /notes/{id}/archive:
 *   patch:
 *     summary: Archives or unarchives a note
 *     description: Updates the archiving status of a specific note for the authenticated user.
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the note to be archived or unarchived.
 *     responses:
 *       200:
 *         description: Archiving status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid note ID or other invalid input.
 *       403:
 *         description: Unauthorized user.
 *       404:
 *         description: Note not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:id/archive', authenticateJWT, toggleArchiveNote);

/**
 * @swagger
 * /notes/reorder:
 *   patch:
 *     summary: Reorder notes
 *     description: Reorders the user's notes based on a provided list of IDs.
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
 *               orderedNotes:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               orderedNotes: ["64bfbb4f2a4e5c1a12345678", "64bfbb4f2a4e5c1a87654321", "64bfbb4f2a4e5c1a11112222"]
 *     responses:
 *       200:
 *         description: Notes reordered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notes ordered successfully."
 *       500:
 *         description: Error sorting notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error sorting notes."
 */
router.patch('/reorder', authenticateJWT, reorderNotes);

/**
 * @swagger
 * /notes/{id}/pin:
 *   patch:
 *     tags:
 *       - Notes
 *     summary: Pin/Unpin a note
 *     description: Toggles the pin status of a note, placing it at the top of the list if pinned or removing it from the top if unpinned.
 *     operationId: pinNote
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the note to be pinned or unpinned.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note pinned/unpinned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Note pinned successfully."
 *                 note:
 *                   $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Note not found!"
 *       500:
 *         description: Error pinning/unpinning note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error pinning/unpinning note"
 */
router.patch('/:id/pin', authenticateJWT, togglePinNote);

/**
 * @swagger
 * /notes/{id}/reminder:
 *   patch:
 *     summary: Sets a reminder for a note
 *     description: Sets a reminder for a specific note to notify the user at the specified time.
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the note to set a reminder for.
 *       - in: query
 *         name: time
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Time to set the reminder.
 *     responses:
 *       200:
 *         description: Reminder set successfully.
 *       400:
 *         description: Invalid time format or note ID.
 *       403:
 *         description: Unauthorized user.
 *       404:
 *         description: Note not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:id/setReminder', authenticateJWT, setReminder);


/**
 * @swagger
 * /notes/{noteId}/checklist:
 *   post:
 *     summary: Add a checklist item for a note
 *     description: Creates a new checklist item for the specified note.
 *     tags: [Checklist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema: 
 *           type: string
 *         description: ID of the note.
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               item:
 *                 type: string
 *                 example: Buy Milk
 *     responses:
 *       201:
 *         description: Checklist item added successfully.
 *       400:
 *         description: Invalid time format or note ID.
 *       403:
 *         description: Unauthorized user.
 *       404:
 *         description: Note not found.
 *       500:
 *         description: Internal server error.
 */

router.post('/:noteId/checklist', authenticateJWT, addChecklistItem);

/**
 * @swagger
 * /notes/{noteId}/checklist:
 *   get:
 *     summary: Obtém os itens de checklist de uma nota
 *     description: Retorna todos os itens de checklist associados à nota especificada.
 *     tags:
 *       - Checklist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da nota
 *     responses:
 *       200:
 *         description: Lista de itens de checklist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 checklist:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       content:
 *                         type: string
 *                       done:
 *                         type: boolean
 *       401:
 *         description: Não autorizado
 */
router.get('/:noteId/checklist', authenticateJWT, getChecklistItems);

/**
 * @swagger
 * /notes/{noteId}/checklist/{itemId}/toggle:
 *   patch:
 *     summary: Alterna o status de um item da checklist
 *     description: Alterna o status de um item específico na checklist da nota (feito ou não feito).
 *     tags:
 *       - Checklist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da nota
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item de checklist
 *     responses:
 *       200:
 *         description: Status do item alternado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Status do item alternado"
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     content:
 *                       type: string
 *                     done:
 *                       type: boolean
 *       404:
 *         description: Item de checklist não encontrado
 *       401:
 *         description: Não autorizado
 */
router.patch('/:noteId/checklist/:itemId/toggle', authenticateJWT, toggleChecklistItem);

/**
 * @swagger
 * /notes/{noteId}/checklist/{itemId}:
 *   delete:
 *     summary: Remove um item da checklist
 *     description: Exclui um item específico da checklist da nota.
 *     tags:
 *       - Checklist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da nota
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item de checklist
 *     responses:
 *       200:
 *         description: Item de checklist removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item removido com sucesso"
 *       404:
 *         description: Item de checklist não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete('/:noteId/checklist/:itemId', authenticateJWT, removeChecklistItem);


/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Deletes an existing note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the note to be deleted
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:id', authenticateJWT, deleteNote);

export default router;