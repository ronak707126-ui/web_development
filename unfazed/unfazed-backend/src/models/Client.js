const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  primaryHealthIssue: { type: String, default: 'General Anxiety' },
  assignedTherapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);