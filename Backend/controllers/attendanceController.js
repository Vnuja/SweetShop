const Attendance = require('../models/attendanceModel');

exports.markAttendance = async (req, res) => {
  try {
    const { staffId, date, status } = req.body;

    // Create a new Date object for the attendance date
    const attendanceDate = new Date(date);

    // Get the current date and set hours to 0 to compare only the date part
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Also set attendance date's hours to 0 to only compare the date
    attendanceDate.setHours(0, 0, 0, 0);

    // Now compare only the date part (ignoring time)
    if (attendanceDate > currentDate) {
      return res.status(400).json({ message: "Attendance cannot be marked for a future date." });
    }

    // Save attendance
    const attendance = new Attendance({ staffId, status, date });
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to mark attendance.' });
  }
};


exports.getAttendance = async (req, res) => {
  try {
    const { staffId } = req.params;
    const attendanceRecords = await Attendance.find({ staffId });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve attendance records.' });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate('staffId'); 
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve attendance records.' });
  }
};