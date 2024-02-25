const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel');

// Get all payments for a specific client
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find({ clientId: req.query.clientId });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new payment
router.post('/', async (req, res) => {
  const payment = new Payment({
    clientId: req.body.clientId,
    amount: req.body.amount,
    date: req.body.date
  });

  try {
    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
