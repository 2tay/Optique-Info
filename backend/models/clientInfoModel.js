const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientInfoSchema = new Schema({
    clientId: { type: Number, required: true },
    prescription: String,
    lastVisit: Date,
    nextAppointment: Date,
    notes: [{ heading: String, desc: String }]
}, { timestamps: true });

module.exports = mongoose.model('ClientInfo', clientInfoSchema)