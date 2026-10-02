import mongoose from 'mongoose';

const therapistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-z0-9-]+$/,
  },
  professionalTitle: {
    type: String,
    trim: true,
  },
  licenseNumber: {
    type: String,
    trim: true,
  },
  specializations: [{
    type: String,
    trim: true,
  }],
  languages: [{
    type: String,
    trim: true,
  }],
  bio: {
    type: String,
    maxlength: 2000,
  },
  profileImage: {
    url: String,
    publicId: String,
  },
  qualifications: [{
    degree: String,
    institution: String,
    year: Number,
  }],
  experienceYears: {
    type: Number,
    default: 0,
  },
  consultationFee: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  timezone: {
    type: String,
    default: 'Asia/Kolkata',
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' },
  },
  phone: {
    type: String,
    trim: true,
  },
  website: String,
  socialLinks: {
    linkedin: String,
    twitter: String,
    instagram: String,
  },
  subscription: {
    tier: {
      type: String,
      enum: ['free', 'starter', 'professional', 'enterprise'],
      default: 'free',
    },
    status: {
      type: String,
      enum: ['active', 'past_due', 'canceled', 'trialing'],
      default: 'active',
    },
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    cancelAtPeriodEnd: { type: Boolean, default: false },
    razorpaySubscriptionId: String,
    razorpayCustomerId: String,
  },
  branding: {
    primaryColor: { type: String, default: '#6366f1' },
    secondaryColor: { type: String, default: '#8b5cf6' },
    logoUrl: String,
    customDomain: String,
  },
  settings: {
    allowClientBooking: { type: Boolean, default: true },
    requireBookingApproval: { type: Boolean, default: false },
    sendEmailReminders: { type: Boolean, default: true },
    sendWhatsAppReminders: { type: Boolean, default: false },
    sessionDurationDefault: { type: Number, default: 50 },
    bufferTime: { type: Number, default: 10 },
    maxAdvanceBookingDays: { type: Number, default: 60 },
    cancellationPolicy: { type: String, default: '24 hours' },
  },
  isProfilePublic: {
    type: Boolean,
    default: true,
  },
  isOnboarded: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

therapistSchema.virtual('publicProfileUrl').get(function() {
  return `${process.env.FRONTEND_URL}/${this.slug}`;
});

therapistSchema.index({ slug: 1 });
therapistSchema.index({ 'subscription.tier': 1 });
therapistSchema.index({ isProfilePublic: 1, isOnboarded: 1 });

export default mongoose.model('Therapist', therapistSchema);