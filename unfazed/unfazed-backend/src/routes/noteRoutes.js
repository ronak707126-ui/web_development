const express = require('express');
const router = express.Router();
const { saveSoapNote } = require('../controllers/noteController');

router.post('/soap', saveSoapNote);

module.exports = router;