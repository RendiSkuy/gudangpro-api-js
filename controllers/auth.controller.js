import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Username sudah ada." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ username, password: hashedPassword });

        res.status(201).json({ result });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan." });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.status(404).json({ message: "User tidak ditemukan." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Password salah." });

        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan." });
    }
};