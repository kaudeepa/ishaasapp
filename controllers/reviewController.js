const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const Bureaucrat = require('../models/Bureaucrat');

// @desc Create a review
// @route POST /api/reviews
// @access Private
const createReview = asyncHandler(async (req, res) => {
    const { bureaucrat, rating, comment } = req.body;

    const review = new Review({
        user: req.user._id,
        bureaucrat,
        rating,
        comment,
    });

    const createdReview = await review.save();

    const bureaucratData = await Bureaucrat.findById(bureaucrat);

    if (bureaucratData) {
        const reviews = await Review.find({ bureaucrat: bureaucratData._id });
        bureaucratData.averageRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
        await bureaucratData.save();
    }

    res.status(201).json(createdReview);
});

// @desc Get reviews by bureaucrat
// @route GET /api/reviews/:bureaucratId
// @access Public
const getReviewsByBureaucrat = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ bureaucrat: req.params.bureaucratId }).populate('user', 'name');
    res.json(reviews);
});

module.exports = { createReview, getReviewsByBureaucrat };