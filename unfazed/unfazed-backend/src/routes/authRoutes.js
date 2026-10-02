const express = require('express');
const router = express.Router();
const { login, registerClient, submitTherapistDocs, approveTherapistDoc } = require('../controllers/authController');

router.post('/login', login);
router.post('/client/register', registerClient);
router.post('/therapist/submit-docs', submitTherapistDocs);
router.post('/therapist/approve-doc', approveTherapistDoc);

module.exports = router;