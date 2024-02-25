const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    clientId: { type: Number, required: true },
    date: { type: Date, required: true },
    time: String,
    type: String,
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema)