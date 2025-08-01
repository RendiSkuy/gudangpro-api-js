import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import barangRoutes from './routes/barang.routes.js';

import transactionRoutes from './routes/transaction.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/barang', barangRoutes);
app.use('/api/transactions', transactionRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Berhasil terhubung ke MongoDB');
        app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
    })
    .catch((error) => {
        console.error('Koneksi database gagal!', error.message);
    });