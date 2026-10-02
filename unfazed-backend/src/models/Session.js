import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist',
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show', 'rescheduled'],
    default: 'scheduled',
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
    default: 'Asia/Kolkata',
  },
  duration: {
    type: Number,
    required: true,
  },
  sessionType: {
    type: String,
    enum: ['individual', 'couple', 'family', 'group'],
    default: 'individual',
  },
  meetingLink: String,
  meetingPassword: String,
  meetingPlatform: {
    type: String,
    enum: ['google-meet', 'zoom', 'teams', 'phone', 'in-person', 'other'],
    default: 'google-meet',
  },
  location: {
    type: String,
    enum: ['online', 'offline'],
    default: 'online',
  },
  address: String,
  notes: {
    therapistPrivate: String,
    shared: String,
  },
  cancellation: {
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    cancelledAt: Date,
    reason: String,
    refundAmount: { type: Number, default: 0 },
  },
  rescheduleHistory: [{
    previousStartTime: Date,
    previousEndTime: Date,
    rescheduledAt: Date,
    rescheduledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reason: String,
  }],
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  },
  reminderSent: {
    type: Boolean,
    default: false,
  },
  reminderSentAt: Date,
  isRecurring: { type: Boolean, default: false },
  recurringRule: {
    frequency: { type: String, enum: ['weekly', 'biweekly', 'monthly'] },
    interval: { type: Number, default: 1 },
    endDate: Date,
    occurrences: Number,
  },
  parentSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

sessionSchema.index({ therapist: 1, startTime: 1 });
sessionSchema.index({ client: 1, startTime: 1 });
sessionSchema.index({ therapist: 1, status: 1, startTime: 1 });
sessionSchema.index({ startTime: 1, status: 1 });

sessionSchema.virtual('isUpcoming').get(function() {
  return this.startTime > new Date() && ['scheduled', 'confirmed'].includes(this.status);
});

sessionSchema.virtual('isPast').get(function() {
  return this.startTime < new Date() || ['completed', 'cancelled', 'no-show'].includes(this.status);
});

export default mongoose.model('Session', sessionSchema);