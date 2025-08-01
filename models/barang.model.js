import mongoose from 'mongoose';

const barangSchema = new mongoose.Schema({
    nama_barang: { type: String, required: true, trim: true },
    kategori: { type: String, required: true },
    jumlah_stok: { type: Number, required: true, default: 0 },
    satuan: { type: String, required: true },
    tanggal_masuk: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Barang = mongoose.model('Barang', barangSchema);
export default Barang;