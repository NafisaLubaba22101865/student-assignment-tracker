const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],  // Changed 'Submitted' to 'Completed'
    default: 'Not Started'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Assignment', assignmentSchema);
