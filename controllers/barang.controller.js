import Barang from '../models/barang.model.js';

// Mengambil semua data barang
export const getBarang = async (req, res) => {
    try {
        const barangs = await Barang.find().sort({ createdAt: -1 });
        res.status(200).json(barangs);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data', error });
    }
};

// Membuat data barang baru
export const createBarang = async (req, res) => {
    const barangBaru = new Barang(req.body);
    try {
        const savedBarang = await barangBaru.save();
        res.status(201).json(savedBarang);
    } catch (error) {
        // Mengirim pesan error validasi yang lebih jelas
        res.status(400).json({ message: error.message });
    }
};

// Mengupdate barang
export const updateBarang = async (req, res) => {
    try {
        const updatedBarang = await Barang.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBarang) return res.status(404).json({ message: "Barang tidak ditemukan" });
        res.status(200).json(updatedBarang);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus barang
export const deleteBarang = async (req, res) => {
    try {
        const deletedBarang = await Barang.findByIdAndDelete(req.params.id);
        if (!deletedBarang) return res.status(404).json({ message: "Barang tidak ditemukan" });
        res.status(200).json({ message: "Barang berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};