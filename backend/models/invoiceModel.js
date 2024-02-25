const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    clientId: { type: Number, required: true },
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    items: [{ productId: Number, productName: String, quantity: Number, unitPrice: Number }]
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema)