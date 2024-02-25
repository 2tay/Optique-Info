// controllers/adminController.js
const Admin = require('../models/adminModel');

//logged Admin
exports.loggedAdmin = async (req, res) => {
    console.log("you are trying to log in")
    const { name, password } = req.body;
    
    try {
        const admin = await Admin.findOne({ name, password });
        
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller functions for handling admin routes
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAdmin = async (req, res) => {
    const admin = new Admin({
        name: req.body.name,
        password: req.body.password
    });
    try {
        const newAdmin = await admin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
