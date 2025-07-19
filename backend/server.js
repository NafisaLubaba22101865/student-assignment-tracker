const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000; // backend server port

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Connect to MongoDB (replace <your_mongodb_uri> with your real connection string)
mongoose.connect('<your_mongodb_uri>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Simple route
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
