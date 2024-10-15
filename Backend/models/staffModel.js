// models/staffModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  staffId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,  // Added age attribute
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
  },
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);
