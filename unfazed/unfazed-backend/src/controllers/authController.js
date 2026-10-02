const Therapist = require('../models/Therapist');
const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Client Registration
exports.registerClient = async (req, res) => {
  try {
    const { fullName, email, password, primaryHealthIssue } = req.body;

    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Email is already registered. Please log in.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new Client({
      fullName,
      email,
      password: hashedPassword,
      primaryHealthIssue: primaryHealthIssue || 'Anxiety & Work Burnout'
    });

    await newClient.save();

    return res.status(201).json({ message: 'Client account registered successfully!' });
  } catch (error) {
    console.error('Client registration error:', error);
    return res.status(500).json({ message: 'Server error during client registration', error: error.message });
  }
};

// 2. Therapist Document Submission & Registration Request
exports.submitTherapistDocs = async (req, res) => {
  try {
    const { fullName, email, password, licenseNumber, documentUrl, specialization } = req.body;

    let existing = await Therapist.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const therapist = new Therapist({
      fullName,
      email,
      password: hashedPassword,
      licenseNumber,
      documentUrl,
      specialization: specialization || ['General Therapy'],
      verificationStatus: 'UNDER_REVIEW'
    });

    await therapist.save();

    res.status(201).json({
      message: 'Documentation submitted successfully. Unfazed verification team will review your credentials within 24 hours.',
      verificationStatus: 'UNDER_REVIEW'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during submission', error: error.message });
  }
};

// 3. Admin Document Verification Approval API
exports.approveTherapistDoc = async (req, res) => {
  try {
    const { therapistId } = req.body;
    const therapist = await Therapist.findById(therapistId);
    if (!therapist) return res.status(404).json({ message: 'Therapist not found' });

    const cleanName = therapist.fullName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const officialEmail = `dr.${cleanName}@unfazed.com`;

    therapist.verificationStatus = 'APPROVED';
    therapist.unfazedEmail = officialEmail;
    await therapist.save();

    res.json({
      message: 'Therapist credentials verified and approved!',
      unfazedEmail: officialEmail
    });
  } catch (error) {
    res.status(500).json({ message: 'Approval failed', error: error.message });
  }
};

// 4. Unified Login Endpoint
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (role === 'therapist') {
      const therapist = await Therapist.findOne({
        $or: [{ email }, { unfazedEmail: email }]
      });

      if (!therapist) return res.status(400).json({ message: 'Invalid therapist credentials' });

      if (therapist.verificationStatus !== 'APPROVED') {
        return res.status(403).json({
          message: `Your account status is: ${therapist.verificationStatus}. Documentation check must be completed before logging in.`
        });
      }

      const isMatch = await bcrypt.compare(password, therapist.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign(
        { id: therapist._id, role: 'therapist' },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );
      return res.json({ token, user: therapist, role: 'therapist' });
    } else {
      const client = await Client.findOne({ email });
      if (!client) return res.status(400).json({ message: 'Invalid client credentials' });

      const isMatch = await bcrypt.compare(password, client.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign(
        { id: client._id, role: 'client' },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );
      return res.json({ token, user: client, role: 'client' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};