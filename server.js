require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/contact', async (req, res) => {
  try {
    console.log("🚨 INCOMING DATA:", req.body);

    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return res.status(201).json({
      success: true,
      message: 'Contact form submission saved successfully',
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save contact form submission',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
