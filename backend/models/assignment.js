const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: { type: Date, required: true },
  content: { type: String, default: '' },            // Stores the written content
  status: { type: String, default: 'Not Started' },  // Not Started | In Progress | Submitted
}, {
  timestamps: true // optional: adds createdAt and updatedAt
});

module.exports = mongoose.model('Assignment', assignmentSchema);
