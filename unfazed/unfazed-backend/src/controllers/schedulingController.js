const Therapist = require('../models/Therapist');
const Session = require('../models/Session');

// Get list of all approved therapists
exports.getApprovedTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find({ verificationStatus: 'APPROVED' }).select('-password');
    res.json(therapists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching therapists', error: error.message });
  }
};

// Book an appointment slot
exports.bookSession = async (req, res) => {
  try {
    const { clientId, therapistId, dateTime, healthIssueType, amountPaid } = req.body;

    const newSession = new Session({
      client: clientId,
      therapist: therapistId,
      dateTime,
      healthIssueType,
      amountPaid,
      paymentStatus: 'PAID'
    });

    await newSession.save();

    res.status(201).json({
      message: 'Appointment booked successfully!',
      session: newSession
    });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

// Get sessions for a specific therapist or client
exports.getSessions = async (req, res) => {
  try {
    const { userId, role } = req.params;
    const query = role === 'therapist' ? { therapist: userId } : { client: userId };

    const sessions = await Session.find(query)
      .populate('client', 'fullName email primaryHealthIssue')
      .populate('therapist', 'fullName unfazedEmail hourlyRate')
      .sort({ dateTime: -1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sessions', error: error.message });
  }
};