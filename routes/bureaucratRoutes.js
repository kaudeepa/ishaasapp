const express = require('express');
const { getBureaucrats, getBureaucratById, createBureaucrat, updateBureaucrat } = require('../controllers/bureaucratController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getBureaucrats).post(protect, admin, createBureaucrat);
router.route('/:id').get(getBureaucratById).put(protect, admin, updateBureaucrat);

module.exports = router;
