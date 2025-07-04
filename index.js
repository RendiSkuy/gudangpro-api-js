import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; // <-- Tambahkan ini
import { fileURLToPath } from 'url'; // <-- Tambahkan ini

import barangRoutes from './routes/barang.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Untuk menangani __dirname di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware untuk menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rute untuk API (tetap sama)
app.use('/api/barang', barangRoutes);

// Rute utama untuk menyajikan file index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Koneksi ke MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Berhasil terhubung ke MongoDB Atlas');
        app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
    })
    .catch((error) => {
        console.error('Koneksi database gagal!', error.message);
    });