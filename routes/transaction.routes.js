import express from 'express';
import { getAllTransactions, createTransaction } from '../controllers/transaction.controller.js';
import protectRoute from '../middleware/auth.js';

const router = express.Router();

// Semua rute transaksi diproteksi
router.get('/', protectRoute, getAllTransactions);
router.post('/', protectRoute, createTransaction);

export default router;