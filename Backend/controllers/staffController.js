const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const Staff = require("../models/staffModel");
const sendEmail = require('../services/emailService'); // Import the email service
require('dotenv').config();


exports.addNewStaff = async (req, res) => {
  try {
    const { staffId, name, dob, age, address, position, department, contact, email, password } = req.body;

    // Log the received data for debugging
    console.log(req.body);

    // Create an array to hold error messages for missing fields
    const missingFields = [];

    // Check each field and push to missingFields array if not provided
    if (!staffId) missingFields.push("staffId");
    if (!name) missingFields.push("name");
    if (!dob) missingFields.push("dob");
    if (!age) missingFields.push("age"); // Check for the age field
    if (!address) missingFields.push("address");
    if (!position) missingFields.push("position");
    if (!department) missingFields.push("department");
    if (!contact) missingFields.push("contact");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password"); 

    // If there are any missing fields, return a detailed message
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: "The following fields are required", 
        missingFields 
      });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new staff member with the hashed password and age
    const newStaff = new Staff({
      staffId,
      name,
      dob,
      age, // Add age to the new staff object
      address,
      position,
      department,
      contact,
      email,
      password: hashedPassword // Store the hashed password
    });

    await newStaff.save();

    // Set up the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other email services as well
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS  
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: email,              
      subject: 'Welcome to Our Team',
      text: `Dear ${name},\n\nWelcome to our team! Your position is ${position} in the ${department} department. Feel free to reach out for any assistance.\n\nBest regards,\nCandy Shop`
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ message: 'Failed to send welcome email.' });
      }
      console.log('Email sent: ' + info.response);
    });

    // Return success response
    res.status(201).json({ message: "New staff member added successfully!" });
    
  } catch (error) {
    console.error("Error adding new staff member:", error);
    res.status(500).json({ message: "Failed to add new staff member." });
  }
};


// Delete a staff member
exports.deleteStaff = (req, res) => {
  const staffId = req.params.id;

  Staff.deleteOne({ _id: staffId })
    .then(() => {
      res.status(200).send({ status: "Staff member deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with delete staff member", error: err.message });
    });
};

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single staff member
exports.getStaffById = async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ message: "Staff member not found!" });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a staff member
exports.updateStaff = async (req, res) => {
  const staffId = req.params.id;
  const { name, dob, age, address, position, department, contact, email } = req.body;

  // Validate inputs
  if (!(name && dob && age && address && position && department && contact && email)) {
    return res.status(400).json({ message: "All inputs are required" });
  }

  try {
    // Check if staff member exists in the database
    const staff = await Staff.findById(staffId);

    if (!staff) {
      return res.status(404).json({ message: "Staff member does not exist!" });
    }

    // Update staff member
    const result = await Staff.updateOne(
      { _id: staffId },
      {
        name,
        dob,
        age, // Include the age in the update
        address,
        position,
        department,
        contact,
        email
      }
    );

    if (result.n === 0) {
      return res.status(404).json({ message: "Staff member not found!" });
    } else if (result.nModified > 0) {
      // Send email notification
      const emailSubject = 'Staff Member Updated';
      const emailText = `The details of a staff member have been updated:\n\nName: ${name}\nPosition: ${position}\nDepartment: ${department}\nContact: ${contact}\nEmail: ${email}\nAge: ${age}`; // Add age to email content
      await sendEmail(emailSubject, emailText);

      return res.status(200).json({ message: "Staff member updated successfully!" });
    } else {
      return res.status(200).json({ message: "No changes detected. Staff member already has the provided details." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
