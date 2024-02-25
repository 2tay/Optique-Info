const express = require('express');
const router = express.Router();
const ClientInformation = require('../models/clientInfoModel'); // Import your Mongoose model

// GET client prescription info by client ID
router.get('/clientInformation', async (req, res) => {
  try {
    const clientId = req.query.clientId;
    const clientInfo = await ClientInformation.find({ clientId: clientId });
    res.json(clientInfo);
  } catch (error) {
    console.error('Error fetching client information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new client prescription info
router.post('/clientInformation', async (req, res) => {
  try {
    const newClientInfo = req.body;
    const createdClientInfo = await ClientInformation.create(newClientInfo);
    res.status(201).json(createdClientInfo);
  } catch (error) {
    console.error('Error creating client information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update client prescription info by client ID
router.put('/clientInformation/:_id', async (req, res) => {
    try {
      const clientId = req.params._id;
      const updatedClientInfo = req.body;
      await ClientInformation.findByIdAndUpdate(clientId, updatedClientInfo);
      res.status(200).json({ message: 'Client information updated successfully' });
    } catch (error) {
      console.error('Error updating client information:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
