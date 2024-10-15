// routes/staff.js
const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");

// Add a new staff member
router.post('/login', authController.login);

module.exports = router;
