// Assuming you have Express.js installed
const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentModel'); // Import your Appointment model

// GET appointments for a specific client
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find({ clientId: req.query.clientId });
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST a new appointment
router.post('/appointments', async (req, res) => {
    try {
        const { clientId, date, time, type, notes } = req.body;
        const newAppointment = new Appointment({ clientId, date, time, type, notes });
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        console.error('Error adding appointment:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
