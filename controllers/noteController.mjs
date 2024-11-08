import { Note } from "../models/Note.mjs";
import logger from '../utils/logger.mjs';

export const createNote = async (req, res) => {
    try {
        const note = await Note.create({ ...req.body, userId: req.user.id });
        logger.info(`Create note with ID: ${note._id} for user ${req.user.id}`);

        res.status(201).json(note);

    } catch (error) {
        logger.error(`Error to create note: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const getNotes = async (req, res) => {
    try {
        const { title, tag, done, archived } = req.query;

        let filter = { userId: req.user.id }


        if (title) {
            filter.title = { $regex: title.trim(), $options: "i" }
        }

        if (tag) {
            filter.tags = tag.trim();
        }

        if (done !== undefined) {
            filter.checklist = { $elemMatch: { done: done === "true" } };
        }

        if (archived !== undefined) {
            filter.archived = archived === "true";
        }

        const notes = await Note.find(filter).sort({ isPinned: -1, order: 1 });

        logger.info(`Get notes for user ${req.user.id}`);
        res.status(200).json(notes);
    } catch (error) {
        logger.error(`Error to get notes: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const updateNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!note) {
            logger.warn(`Note with ID ${id} not found for user ${req.user.id}`);
            return res.status(404).json({ message: "Note not found!" })
        }
        logger.info(`Updated note with ID: ${id} for user ${req.user.id}`);
        res.status(200).json(note);
    } catch (error) {
        logger.error(`Error to update note with ID ${id}: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!note) {
            logger.warn(`Attempted delete on non-existent note with ID ${id} for user ${req.user.id}`);
            return res.status(404).json({ message: "note not found!" });
        }
        logger.info(`Deleted note with ID: ${id} for user ${req.user.id}`);
        res.status(200).json({ message: "Deleted note successfully!" })
    } catch (error) {
        logger.error(`Error to delete note with ID ${id}: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const toggleArchiveNote = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findOne({ _id: id, userId: req.user.id });
        if (!note) {
            return res.status(404).json({ message: "Note not found!" });
        }

        note.archived = !note.archived;
        await note.save();

        const status = note.archived ? 'archived' : 'unarchived';
        logger.info(`Note with ID ${id} has been ${status} for use ${req.user.id}`);

        res.status(200).json({ message: `Note ${status} successfully!`, note })
    } catch (error) {
        logger.error(`Error toggling archive status for note with ID ${id}: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

export const reorderNotes = async (req, res) => {
    try {
        const { orderedNotes } = req.body;

        await Promise.all(
            orderedNotes.map((noteId, index) => Note.findByIdAndUpdate(
                { _id: noteId, userId: req.user.id },
                { order: index }
            )
            )
        );

        logger.info(`Notes reordered for user ${req.user.id}`)

        res.status(200).json({ message: "Notes ordered successfully." });
    } catch (error) {
        logger.error(`Error sorting notes for user ${req.user.id}: ${error.message}`);
        res.status(500).json({ message: "Error sorting notes" });
    }
};

export const togglePinNote = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findOne({ _id: id, userId: req.user.id });
        if (!note) {
            return res.status(404).json({ message: "Note not found!" });
        }
        note.isPinned = !note.isPinned;
        await note.save();

        const status = note.isPinned ? 'pinned' : 'unpinned';
        logger.info(`Note with ID ${id} has been ${status} for use ${req.user.id}`);
        res.status(200).json({ message: `Note ${status} successfully.`, note });
    } catch (error) {
        logger.error(`Error toggling pin status for note with ID ${id}: ${error.message}`);
        res.status(500).json({ message: "Error pinning/unpinning note" });
    }
};

export const setReminder = async (req, res) => {
    const { id } = req.params;
    const { reminder } = req.body;

    try {
        const note = await Note.findByIdAndUpdate(id, { reminder, notified: false }, { new: true });
        if (!note) {
            return res.status(404).json({ message: "Note not found!" });
        }
        res.status(200).json(note);
    } catch (error) {
        logger.error(`Error to set reminder note with ID ${id}: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const addChecklistItem = async (req, res) => {
    const { noteId } = req.params;
    const { item } = req.body;

    try {
        const note = await Note.findOneAndUpdate(
            { _id: noteId, userId: req.user.id },
            { $push: { checklist: { item, done: false } } },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found!' });
        }
        res.status(200).json(note)
    } catch (error) {
        logger.error(`Error to add checklist note with ID ${noteId}: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const getChecklistItems = async (req, res) => {
    const { noteId } = req.params;

    try {
        const note = await Note.findOne({ _id: noteId, userId: req.user.id });

        if (!note) {
            return res.status(404).json({ message: 'Note not found!' });
        }

        res.status(200).json(note.checklist);
    } catch (error) {
        logger.error(`Error to get checklist note with ID ${noteId}: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};


export const toggleChecklistItem = async (req, res) => {
    const { noteId, itemId } = req.params;

    try {
        const note = await Note.findOneAndUpdate(
            { _id: noteId, "checklist._id": itemId, userId: req.user.id },
            { $set: { "checklist.$.done": req.body.done } },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found!' });
        }
        res.status(200).json(note);
    } catch (error) {
        logger.error(`Error to check note with ID ${noteId}: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};


export const removeChecklistItem = async (req, res) => {
    const { noteId, itemId } = req.params;

    try {
        const note = await Note.findOneAndUpdate(
            { _id: noteId, userId: req.user.id },
            { $pull: { checklist: { _id: itemId } } },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: "Note or item not found!" });
        }

        res.status(200).json(note);
    } catch (error) {
        logger.error(`Error to remove checklist note with ID ${noteId}: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
