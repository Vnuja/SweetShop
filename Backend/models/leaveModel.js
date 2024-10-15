const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
