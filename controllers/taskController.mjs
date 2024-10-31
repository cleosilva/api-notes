import { Task } from "../models/Task.mjs";
import logger from '../utils/logger.mjs';

export const createTask = async (req, res) => {
    try {
        const task = await Task.create({ ...req.body, userId: req.user.id });
        logger.info(`Create task with ID: ${task._id} for user ${req.user.id}`);

        res.status(201).json(task);

    } catch (error) {
        logger.error(`Error to create task: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        logger.info(`Get tasks for user ${req.user.id}`);
        res.status(200).json(tasks);
    } catch (error) {
        logger.error(`Error to get tasks: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) {
            logger.warn(`Task with ID ${id} not found for user ${req.user.id}`);
            return res.status(404).json({ message: "Task not found!" })
        }
        logger.info(`Updated task with ID: ${id} for user ${req.user.id}`);
        res.status(200).json(task);
    } catch (error) {
        logger.error(`Error to update task with ID ${id}: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!task) {
            logger.warn(`Attempted delete on non-existent task with ID ${id} for user ${req.user.id}`);
            return res.status(404).json({ message: "Task not found!" });
        }
        logger.info(`Deleted task with ID: ${id} for user ${req.user.id}`);
        res.status(200).json({ message: "Deleted task successfully!" })
    } catch (error) {
        logger.error(`Error to delete task with ID ${id}: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};