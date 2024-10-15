const Leave = require('../models/leaveModel');
const nodemailer = require('nodemailer');
require('dotenv').config(); // To access environment variables

exports.applyLeave = async (req, res) => {
  try {
    const { staffId, startDate, endDate, reason } = req.body;
    const leave = new Leave({ staffId, startDate, endDate, reason });
    await leave.save();
    res.status(201).json({ message: 'Leave applied successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to apply for leave.' });
  }
};

exports.getLeaves = async (req, res) => {
  try {
    const { staffId } = req.params;
    const leaves = await Leave.find({ staffId });
    res.status(200).json(leaves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve leave records.' });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json(leaves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve all leave records.' });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  const { leaveId } = req.params; // Get the leave ID from request parameters
  const { status } = req.body; // Get the new status from request body

  try {
    // Find leave record by ID and update status
    const leaveRecord = await Leave.findByIdAndUpdate(
      leaveId,
      { status }, // Update the status
      { new: true } // Return the updated document
    ).populate('staffId'); // Assuming you have an employee reference

    if (!leaveRecord) {
      return res.status(404).json({ message: 'Leave record not found' });
    }

    console.log(leaveRecord);

    // Assuming leaveRecord has an staffId field that references the employee
    const employeeEmail = leaveRecord.staffId.email; 
    const employeeName = leaveRecord.staffId.name; 

    // Send an email to the employee informing them of the status update
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: employeeEmail, 
      subject: 'Leave Status Update',
      text: status === 'Rejected' 
        ? `Dear ${employeeName},\n\nWe are sorry to inform you that your leave request has been rejected.\n\nBest regards,\nYour Company`
        : `Dear ${employeeName},\n\nYour leave request status has been updated to: ${status}.\n\nBest regards,\nCandy Shop`
    };
    

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ message: 'Failed to send email notification' });
      }
      console.log('Email sent: ' + info.response);
    });

    // Return success response
    res.status(200).json({ message: 'Status updated successfully and email sent', leaveRecord });
    
  } catch (error) {
    console.error('Error updating leave status:', error);
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
};

