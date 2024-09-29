// models/Lead.js
const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);
