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
        const { title, tag, done } = req.query;

        console.log('title', title)
        console.log('done', done)
        console.log('tag', tag)


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

        console.log('Filter:', filter);

        const notes = await Note.find(filter);
        console.log('notes', notes)
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