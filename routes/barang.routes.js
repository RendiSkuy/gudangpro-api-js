import express from 'express';
import {
    getAllBarang,
    createBarang,
    updateBarang,
    deleteBarang,
} from '../controllers/barang.controller.js';

const router = express.Router();

router.get('/', getAllBarang);
router.post('/', createBarang);
router.put('/:id', updateBarang);
router.delete('/:id', deleteBarang);

export default router;