const Session = require('../models/Session');

// Save or update SOAP note for a session
exports.saveSoapNote = async (req, res) => {
  try {
    const { sessionId, subjective, objective, assessment, plan, sharedWithClient } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    session.soapNote = {
      subjective,
      objective,
      assessment,
      plan,
      sharedWithClient: Boolean(sharedWithClient)
    };

    await session.save();

    res.json({ message: 'SOAP Clinical Note saved successfully!', soapNote: session.soapNote });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save clinical note', error: error.message });
  }
};