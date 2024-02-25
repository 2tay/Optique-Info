// Import necessary modules
const express = require('express');
const router = express.Router();
const Admin  = require('../models/adminModel'); 
const adminController = require('../controllers/adminControllers')

router.post('/login', adminController.loggedAdmin);
router.get('/', adminController.getAllAdmins);
router.post('/', adminController.createAdmin);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin)



module.exports = router