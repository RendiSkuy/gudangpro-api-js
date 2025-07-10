import express from 'express';
import { getBarang, createBarang, updateBarang, deleteBarang } from '../controllers/barang.controller.js';

const router = express.Router();

router.route('/')
    .get(getBarang)
    .post(createBarang);

router.route('/:id')
    .put(updateBarang)
    .delete(deleteBarang);

export default router;