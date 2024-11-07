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

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.find({ userId: req.user.id });
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tags", error: error.message });
    }
};