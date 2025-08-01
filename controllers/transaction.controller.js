import Transaction from '../models/transaction.model.js';
import Barang from '../models/barang.model.js';

// GET all transactions, bisa difilter berdasarkan tipe
export const getAllTransactions = async (req, res) => {
    try {
        const { tipe } = req.query;
        let query = {};
        if (tipe) {
            query.tipe = tipe;
        }
        
        const transactions = await Transaction.find(query)
            .populate('id_barang', 'nama_barang kategori') // Ambil nama & kategori barang
            .sort({ tanggal: -1 });
            
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE a new transaction
export const createTransaction = async (req, res) => {
    const { id_barang, jumlah, tipe } = req.body;

    try {
        const barang = await Barang.findById(id_barang);
        if (!barang) {
            return res.status(404).json({ message: "Barang tidak ditemukan" });
        }

        // Update stok barang berdasarkan tipe transaksi
        if (tipe === 'masuk') {
            barang.jumlah_stok += jumlah;
        } else if (tipe === 'keluar') {
            if (barang.jumlah_stok < jumlah) {
                return res.status(400).json({ message: "Stok tidak mencukupi" });
            }
            barang.jumlah_stok -= jumlah;
        } else {
            return res.status(400).json({ message: "Tipe transaksi tidak valid" });
        }
        
        // Simpan perubahan stok pada barang
        await barang.save();

        // Buat catatan transaksi baru
        const newTransaction = new Transaction({ 
            id_barang, 
            jumlah, 
            tipe, 
            stok_akhir: barang.jumlah_stok 
        });
        await newTransaction.save();

        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};