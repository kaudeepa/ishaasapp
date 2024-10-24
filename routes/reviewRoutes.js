const express = require('express');
const { createReview, getReviewsByBureaucrat } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createReview);
router.route('/:bureaucratId').get(getReviewsByBureaucrat);

module.exports = router;