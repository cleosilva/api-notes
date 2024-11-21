import { Server } from 'socket.io';
import { Note } from '../models/Note.mjs';
import { io } from '../server.mjs';
import logger from '../utils/logger.mjs';


const checkReminders = () => {
    setInterval(async () => {
        try {
            const notes = await Note.find({ reminder: { $lt: new Date() }, notified: false });

            notes.forEach(async (note) => {
                io.emit('reminderNotification', {
                    noteId: note._id,
                    title: note.title,
                    content: note.content,
                    reminderTime: note.reminder,
                    message: 'Lembrete: Hora de verificar sua nota!',
                });
                logger.info(`Notificação de lembrete enviada para a nota com ID: ${note._id}`);

                try {
                    await Note.findByIdAndUpdate(note._id, { notified: true });
                    logger.info(`Nota com ID ${note._id} marcada como notificada.`);
                } catch (updateError) {
                    logger.error(`Erro ao atualizar o status de notificação da nota com ID ${note._id}: ${updateError}`);
                }
            });
        } catch (error) {
            logger.error(`Erro ao buscar notas com lembretes: ${error}`);
        }
    }, 60000);
};

export default checkReminders;
