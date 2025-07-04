import Barang from '../models/barang.model.js';

// GET all
export const getAllBarang = async (req, res) => {
    try {
        let query = {};
        if (req.query.search) {
            query.nama_barang = { $regex: req.query.search, $options: 'i' };
        }
        const barangs = await Barang.find(query).sort({ createdAt: -1 });
        res.status(200).json(barangs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE
export const createBarang = async (req, res) => {
    const barang = new Barang(req.body);
    try {
        const insertedBarang = await barang.save();
        res.status(201).json(insertedBarang);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE
export const updateBarang = async (req, res) => {
    try {
        const updatedBarang = await Barang.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBarang) return res.status(404).json({ message: 'Barang tidak ditemukan' });
        res.status(200).json(updatedBarang);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE
export const deleteBarang = async (req, res) => {
    try {
        const deletedBarang = await Barang.findByIdAndDelete(req.params.id);
        if (!deletedBarang) return res.status(404).json({ message: 'Barang tidak ditemukan' });
        res.status(200).json({ message: 'Barang berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};