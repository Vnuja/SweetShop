const bcrypt = require('bcryptjs');
const Staff = require('../models/staffModel'); 

const adminEmail = 'admin@gmail.com';
const adminPassword = 'admin'; 

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === adminEmail) {
      if (password === adminPassword) {
        return res.status(200).json({ success: true, message: 'Admin login successful!', role: 'ADMIN' });
      } else {
        return res.status(400).json({ success: false, message: 'Invalid admin credentials' });
      }
    }

    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    res.status(200).json({ success: true, message: 'Login successful!', role: "USER", user:staff });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login failed. Please try again." });
  }
};
