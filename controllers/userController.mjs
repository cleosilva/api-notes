import { User } from '../models/User.mjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !(await user.validatePassword(req.body.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}