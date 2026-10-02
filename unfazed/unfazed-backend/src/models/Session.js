const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
  dateTime: { type: Date, required: true },
  healthIssueType: { type: String, required: true },
  status: { type: String, enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED'], default: 'SCHEDULED' },
  paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'FAILED'], default: 'PAID' },
  amountPaid: { type: Number, required: true },
  razorpayPaymentId: { type: String },
  soapNote: {
    subjective: String,
    objective: String,
    assessment: String,
    plan: String,
    sharedWithClient: { type: Boolean, default: false }
  }
}, { timestamps: true });

module.exports = mongoose.model('Session', SessionSchema);