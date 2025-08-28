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
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  grade: {                       // ✅ New field for grade tracking
    type: Number,
    default: null,
    min: 0,                      // optional → can't be negative
    max: 100                     // optional → out of 100
  },
  studyTime: {                   // ✅ New field for study time tracking
    totalHours: {
      type: Number,
      default: 0,
      min: 0
    },
    sessions: [{
      date: {
        type: Date,
        default: Date.now
      },
      hours: {
        type: Number,
        required: true,
        min: 0
      },
      notes: {
        type: String,
        default: ''
      }
    }]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Assignment', assignmentSchema);
