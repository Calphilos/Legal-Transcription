// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// MongoDB Schemas
const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  filename: String,
  date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  date: { type: Date, default: Date.now },
});

const Submission = mongoose.model('Submission', submissionSchema);
const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  const { name, email } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const submission = new Submission({
    name,
    email,
    filename: file.filename,
  });

  try {
    await submission.save();
    res.send("✅ File uploaded and saved!");
  } catch (error) {
    console.error("Error saving to database:", error);
    res.status(500).send("❌ Upload failed.");
  }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.send("✅ Signup successful! You can now log in.");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("❌ Signup failed. Email may already be in use.");
  }
});

// Fetch submissions (for dashboard or admin)
app.get('/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ date: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).send("Error fetching submissions.");
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
