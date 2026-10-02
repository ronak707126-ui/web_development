import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    sparse: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary', 'prefer-not-to-say'],
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' },
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
  },
  referralSource: String,
  tags: [{
    type: String,
    trim: true,
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived', 'waitlist'],
    default: 'active',
  },
  intakeForm: {
    submittedAt: Date,
    data: mongoose.Schema.Types.Mixed,
    version: { type: Number, default: 1 },
  },
  consentForms: [{
    type: {
      type: String,
      enum: ['treatment', 'privacy', 'communication', 'recording'],
    },
    signedAt: Date,
    ipAddress: String,
    version: String,
  }],
  notes: {
    type: String,
    maxlength: 5000,
  },
  preferredLanguage: {
    type: String,
    default: 'English',
  },
  timezone: {
    type: String,
    default: 'Asia/Kolkata',
  },
  totalSessions: { type: Number, default: 0 },
  completedSessions: { type: Number, default: 0 },
  cancelledSessions: { type: Number, default: 0 },
  noShowSessions: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  lastSessionDate: Date,
  nextSessionDate: Date,
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

clientSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

clientSchema.index({ therapist: 1, email: 1 }, { unique: true });
clientSchema.index({ therapist: 1, status: 1 });
clientSchema.index({ therapist: 1, firstName: 1, lastName: 1 });

export default mongoose.model('Client', clientSchema);