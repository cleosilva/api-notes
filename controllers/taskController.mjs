import { Task } from "../models/Task.mjs";

export const createTask = async (req, res) => {
    try {
        const task = await Task.create({ ...req.body, userId: req.user.id });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};