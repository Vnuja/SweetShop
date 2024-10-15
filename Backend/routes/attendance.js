// routes/staff.js
const express = require('express');
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

// Mark new attendance
router.get("/", attendanceController.getAllAttendance);
router.get('/:staffId', attendanceController.getAttendance);
router.post('/mark', attendanceController.markAttendance);

module.exports = router;
