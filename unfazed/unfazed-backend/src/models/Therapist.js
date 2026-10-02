const mongoose = require('mongoose');

const TherapistSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  unfazedEmail: { type: String, unique: true }, // Auto-generated @unfazed.com email
  specialization: [String],
  licenseNumber: { type: String, required: true },
  verificationStatus: { 
    type: String, 
    enum: ['PENDING_DOCS', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'], 
    default: 'PENDING_DOCS' 
  },
  documentUrl: { type: String },
  hourlyRate: { type: Number, default: 80 },
  subscriptionTier: { type: String, enum: ['BASIC', 'PRO', 'ENTERPRISE'], default: 'PRO' },
  bio: { type: String, default: 'Licensed Clinical Psychologist dedicated to empathetic patient care.' },
  availableSlots: [{ date: String, time: String, isBooked: { type: Boolean, default: false } }],
}, { timestamps: true });

module.exports = mongoose.model('Therapist', TherapistSchema);