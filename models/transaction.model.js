import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    id_barang: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Barang', // Merujuk ke model Barang
        required: true 
    },
    jumlah: { type: Number, required: true },
    tipe: { type: String, enum: ['masuk', 'keluar'], required: true },
    tanggal: { type: Date, default: Date.now },
    stok_akhir: { type: Number, required: true } // Mencatat stok setelah transaksi
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;