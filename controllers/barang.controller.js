import Barang from '../models/barang.model.js';

// GET all barang (dengan filter status dan search)
export const getAllBarang = async (req, res) => {
    try {
        const { status, search } = req.query;
        let query = {};
        if (status === 'active') query.isActive = true;
        else if (status === 'inactive') query.isActive = false;
        if (search) query.nama_barang = { $regex: search, $options: 'i' };

        const barangs = await Barang.find(query).sort({ createdAt: -1 });
        res.status(200).json(barangs);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// CREATE barang
export const createBarang = async (req, res) => {
    try {
        const barang = new Barang(req.body);
        const insertedBarang = await barang.save();
        res.status(201).json(insertedBarang);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE barang (dengan logging untuk debug)
export const updateBarang = async (req, res) => {
    // --- LOGGING UNTUK DEBUGGING ---
    console.log("Mencoba update barang dengan ID:", req.params.id);
    console.log("Data yang diterima untuk update:", req.body);
    // --------------------------------

    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID barang diperlukan." });
        }
        const updatedBarang = await Barang.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBarang) {
            return res.status(404).json({ message: "Barang tidak ditemukan." });
        }
        res.status(200).json(updatedBarang);
    } catch (error) {
        console.error("Error saat update barang:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan di server." });
    }
};