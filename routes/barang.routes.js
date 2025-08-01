import express from 'express';
import { 
    getAllBarang, 
    createBarang, 
    updateBarang, 
} from '../controllers/barang.controller.js';
import protectRoute from '../middleware/auth.js';

const router = express.Router();

router.get('/', protectRoute, getAllBarang);
router.post('/', protectRoute, createBarang);
router.put('/:id', protectRoute, updateBarang);


export default router;