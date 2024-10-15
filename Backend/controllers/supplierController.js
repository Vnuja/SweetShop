// controllers/supplierController.js
const Supplier = require("../models/supplierModel");
const mongoose = require('mongoose'); 
const nodemailer = require('nodemailer');

// Add a new supplier
exports.addNewSupplier = async (req, res) => {
  try {
    const { supplierId, firstName, lastName, email, phone, address, supplierCategory, contactPerson, accountNumber, bank, branch } = req.body;

    // Log the received data for debugging
    console.log(req.body);

    // Create an array to hold error messages for missing fields
    const missingFields = [];

    // Check each field and push to missingFields array if not provided
    if (!supplierId) missingFields.push("supplierId");
    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");
    if (!address) missingFields.push("address");
    if (!supplierCategory) missingFields.push("supplierCategory");
    if (!contactPerson) missingFields.push("contactPerson");
    if (!accountNumber) missingFields.push("accountNumber");
    if (!bank) missingFields.push("bank");
    if (!branch) missingFields.push("branch");

    // If there are any missing fields, return a detailed message
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "The following fields are required",
        missingFields
      });
    }

    // Create new supplier
    const newSupplier = new Supplier({
      supplierId,
      firstName,
      lastName,
      email,
      phone,
      address,
      supplierCategory,
      contactPerson,
      accountNumber,
      bank,
      branch
    });

    await newSupplier.save();

    // Define and initialize the transporter using your email service credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email notification after successfully adding the supplier
    const mailOptions = {
      from: process.env.EMAIL_FROM, 
      to: process.env.EMAIL_TO,
      subject: 'New Supplier Added',
      html: `
        <h1>New Supplier Details</h1>
        <p><strong>Supplier ID:</strong> ${supplierId}</p>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Supplier Category:</strong> ${supplierCategory}</p>
        <p><strong>Contact Person:</strong> ${contactPerson}</p>
        <p><strong>Account Number:</strong> ${accountNumber}</p>
        <p><strong>Bank:</strong> ${bank}</p>
        <p><strong>Branch:</strong> ${branch}</p>
        <p>Please review the supplier details in the system. Thank you!</p>
      `
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    // Send success response
    res.status(201).json({ message: "New supplier added successfully!", supplierId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a supplier
exports.deleteSupplier = (req, res) => {
  const supplierId = req.params.id;

  Supplier.deleteOne({ _id: supplierId })
    .then(() => {
      res.status(200).send({ status: "Supplier deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with delete supplier", error: err.message });
    });
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single supplier by ID
exports.getSupplierById = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findById(id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found!" });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a supplier
exports.updateSupplier = async (req, res) => {
  const supplierId = req.params.id;
  const { firstName, lastName, email, phone, address, supplierCategory, contactPerson, accountNumber, bank, branch } = req.body;

  // Validate inputs
  if (!(firstName && lastName && email && phone && address && supplierCategory && contactPerson && accountNumber && bank && branch)) {
    return res.status(400).send({ message: "All inputs are required" });
  }

  // Check if supplierId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(supplierId)) {
    return res.status(400).send({ message: "Invalid supplier ID" });
  }

  try {
    // Check if the supplier exists in the database
    const isSupplier = await Supplier.findById(supplierId);

    if (!isSupplier) {
      return res.status(404).json({ message: "Supplier not found!" });
    }

    // Update the supplier
    const result = await Supplier.updateOne(
      { _id: supplierId },
      {
        firstName,
        lastName,
        email,
        phone,
        address,
        supplierCategory,
        contactPerson,
        accountNumber,
        bank,
        branch
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: "No changes were made" });
    }

    return res.status(200).json({ message: "Supplier updated successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const supplierCategories = [
  'Confectionery Ingredients Suppliers',
  'Chocolate Suppliers',
  'Packaging Suppliers',
  'Baking Equipment Suppliers',
  'Decoration Suppliers'
];

// Get supplier category counts
exports.getCategoryCounts = async (req, res) => {
  try {
    // Aggregate the count of suppliers by category
    const categoryCounts = await Supplier.aggregate([
      {
        $group: {
          _id: "$supplierCategory",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          supplierCategory: "$_id",
          count: 1
        }
      },
      {
        $sort: { supplierCategory: 1 } // Sort by category name (optional)
      }
    ]);

    // Manually populate counts for all predefined categories
    const result = supplierCategories.map(category => {
      const found = categoryCounts.find(c => c.supplierCategory === category);
      return { supplierCategory: category, count: found ? found.count : 0 };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

