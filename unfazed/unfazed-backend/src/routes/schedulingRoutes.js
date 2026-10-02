const express = require('express');
const router = express.Router();
const { getApprovedTherapists, bookSession, getSessions } = require('../controllers/schedulingController');

router.get('/therapists', getApprovedTherapists);
router.post('/book', bookSession);
router.get('/user/:userId/:role', getSessions);

module.exports = router;