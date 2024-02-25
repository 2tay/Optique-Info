// Import necessary modules
const express = require('express');
const router = express.Router();
const Client = require('../models/clientModel');

// Route to get all clients
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a new client
router.post('/clients', async (req, res) => {
    try {
    const newClient = new Client({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city
    });

    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});

// Route to get details of a specific client
router.get('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update details of a specific client
router.patch('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: 'Client not found' });
    }
    // Update the client object with new data
    if (req.body.firstName != null) {
      client.firstName = req.body.firstName;
    }
    if (req.body.lastName != null) {
      client.lastName = req.body.lastName;
    }
    // Update more fields as needed
    const updatedClient = await client.save();
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a specific client
router.delete('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: 'Client not found' });
    }
    await client.remove();
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
