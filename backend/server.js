// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
console.log('🔍 MONGODB_URI:', process.env.MONGODB_URI);


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Simple route
app.get('/', (req, res) => {
  res.send('📡 Hello from Student Assignment Tracker backend!');
});
const Assignment = require('./models/Assignment');

// Get all assignments
app.get('/api/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get assignment by ID
app.get('/api/assignments/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new assignment
app.post('/api/assignments', async (req, res) => {
  const assignment = new Assignment({
    title: req.body.title,
    dueDate: req.body.dueDate,
    content: req.body.content || '',
    status: req.body.status || 'Not Started'
  });
  try {
    const newAssignment = await assignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Submit assignment content (update content)
app.post('/api/assignments/:id/submit', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    assignment.content = req.body.content || assignment.content;
    await assignment.save();
    res.json({ message: 'Assignment submitted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete assignment
app.delete('/api/assignments/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
