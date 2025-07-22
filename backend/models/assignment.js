const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: { type: Date, required: true },
  content: { type: String, default: '' },
  status: { type: String, default: 'Not Started' },
});

module.exports = mongoose.model('Assignment', assignmentSchema);



