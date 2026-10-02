require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/unfazed_db';

// User Schema (Client & Therapist)
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'therapist'], required: true },
  unfazedEmail: { type: String },
  bio: { type: String },
  hourlyRate: { type: Number, default: 120 },
  licenseNumber: { type: String },
  subscriptionTier: { type: String, default: 'PRO' }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Existing dummy therapists aur users clear karein
    await User.deleteMany({ role: 'therapist' });

    // Dummy Verified Therapists Insert Karein
    const dummyTherapists = [
      {
        fullName: 'Dr. Sarah Jenkins, Ph.D.',
        email: 'sarah.jenkins@gmail.com',
        unfazedEmail: 'dr.sarah@unfazed.com',
        password: 'password123',
        role: 'therapist',
        bio: 'Compassionate licensed clinical psychologist with 10+ years experience in CBT & anxiety recovery.',
        hourlyRate: 120,
        licenseNumber: 'PSY-98214',
        subscriptionTier: 'PRO'
      },
      {
        fullName: 'Dr. Rajesh Sharma, M.D.',
        email: 'rajesh.sharma@gmail.com',
        unfazedEmail: 'dr.rajesh@unfazed.com',
        password: 'password123',
        role: 'therapist',
        bio: 'Senior Psychiatrist specializing in work burnout, depression, and stress management.',
        hourlyRate: 150,
        licenseNumber: 'MED-44102',
        subscriptionTier: 'PRO'
      }
    ];

    await User.insertMany(dummyTherapists);
    console.log('🎉 Seed Successful! Sample Therapists inserted into Database.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error Seeding Database:', error);
    process.exit(1);
  }
};

seedDatabase();