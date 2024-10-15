// models/supplierModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  supplierId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  supplierCategory: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  }
}, 
{
  timestamps: true, // Enables createdAt and updatedAt fields
  versionKey: false // Disables the __v field
});

module.exports = mongoose.model('Supplier', supplierSchema);
