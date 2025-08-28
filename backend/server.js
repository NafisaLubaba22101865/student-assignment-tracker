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
app.use(cors({
  origin: 'http://localhost:3000',  // React default port
  credentials: true
}));
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

// Get assignment by ID with ObjectId validation
app.get('/api/assignments/:id', async (req, res) => {
  const id = req.params.id;

  // Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid assignment ID format' });
  }

  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    console.error('Error fetching assignment:', err);
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
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid assignment ID format' });
  }

  try {
    const assignment = await Assignment.findById(id);
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
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid assignment ID format' });
  }

  try {
    const assignment = await Assignment.findByIdAndDelete(id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add study time session
app.post('/api/assignments/:id/study-time', async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid assignment ID format' });
  }

  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    const { hours, notes } = req.body;
    
    if (!hours || hours <= 0) {
      return res.status(400).json({ message: 'Hours must be greater than 0' });
    }

    // Add new study session
    assignment.studyTime.sessions.push({
      date: new Date(),
      hours: hours,
      notes: notes || ''
    });

    // Update total hours
    assignment.studyTime.totalHours += hours;

    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get study time for an assignment
app.get('/api/assignments/:id/study-time', async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid assignment ID format' });
  }

  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    
    res.json({
      totalHours: assignment.studyTime.totalHours,
      sessions: assignment.studyTime.sessions
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update assignment (PUT method for editing)
app.put('/api/assignments/:id', async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid assignment ID format' });
  }

  try {
    const assignment = await Assignment.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
