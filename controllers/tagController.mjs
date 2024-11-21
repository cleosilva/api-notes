import mongoose from "mongoose";
import { Tag } from "../models/Tag.mjs";
import logger from '../utils/logger.mjs';


export const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const newTag = await Tag.create(
            {
                name,
                userId: req.user.id
            });
        logger.info(`Tag created for user ${req.user.id}`);
        res.status(201).json(newTag);
    } catch (error) {
        logger.error(`Error creating tag: ${error.message}`);
        res.status(500).json({ message: "Error creating tag", error: error.message });
    }
};

export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedTag = await Tag.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { name },
            { new: true }
        );

        if (!updatedTag) {
            return res.status(404).json({ message: "Tag not found or not authorized" });
        }
        logger.info(`Tag ${id} updated for user ${req.user.id}`);
        res.status(200).json(updatedTag);
    } catch (error) {
        logger.error(`Error updating tag: ${error.message}`);
        res.status(500).json({ message: "Error updating tag", error: error.message });
    }
};

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.find({ userId: req.user.id });
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tags", error: error.message });
    }
};

export const getTagById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid tag ID format" });
        }

        const tag = await Tag.findById(id);

        if (!tag) {
            return res.status(404).json({ message: "Tag not found or not authorized" });
        }

        if (tag.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }
        logger.info(`Tag ${id} is found for user ${req.user.id}`);
        res.status(200).json(tag);
    } catch (error) {
        logger.error(`Error fetching tag: ${error.message}`);
        res.status(500).json({ message: "Error fetching tag", error: error.message });
    }
};


export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTag = await Tag.findOneAndDelete({
            _id: id,
            userId: req.user.id
        });

        if (!deletedTag) {
            return res.status(404).json({ message: "Tag not found or not authorized" });
        }

        logger.info(`Tag ${id} deleted for user ${req.user.id}`);
        res.status(200).json({ message: "Tag deleted successfully" });
    } catch (error) {
        logger.error(`Error deleting tag: ${error.message}`);
        res.status(500).json({ message: "Error deleting tag", error: error.message });
    }
};