// routes/staff.js
const express = require('express');
const router = express.Router();
const leaveController = require("../controllers/leaveController");

// Add a new staff member
router.get('/', leaveController.getAllLeaves);
router.get('/:staffId', leaveController.getLeaves);
router.post('/apply/:staffId', leaveController.applyLeave);
router.patch('/leaves/:leaveId', leaveController.updateLeaveStatus);

module.exports = router;
