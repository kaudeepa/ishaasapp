const asyncHandler = require('express-async-handler');
const Bureaucrat = require('../models/Bureaucrat');

// @desc Fetch all bureaucrats
// @route GET /api/bureaucrats
// @access Public
const getBureaucrats = asyncHandler(async (req, res) => {
    console.log(`route: GET /api/bureaucrats`);
    const bureaucrats = await Bureaucrat.find({});
    res.json(bureaucrats);
});

// @desc Fetch single bureaucrat
// @route GET /api/bureaucrats/:id
const getBureaucratById = asyncHandler(async (req, res) => {
    console.log(`route: GET /api/bureaucrats/:id,req.params.id:\n${JSON.stringify(req.params.id)}`);

    const bureaucrat = await Bureaucrat.findById(req.params.id);

    if (bureaucrat) {
        res.json(bureaucrat);
    } else {
        res.status(404);
        throw new Error('Bureaucrat not found');
    }
});

// @desc Create a bureaucrat
// @route POST /api/bureaucrats
// @access Private/Admin
const createBureaucrat = asyncHandler(async (req, res) => {
    const { name, department, position, contact } = req.body;

    const bureaucrat = new Bureaucrat({
        name,
        department,
        position,
        contact,
    });

    const createdBureaucrat = await bureaucrat.save();
    res.status(201).json(createdBureaucrat);
});

// @desc Update a bureaucrat
// @route PUT /api/bureaucrats/:id
// @access Private/Admin
const updateBureaucrat = asyncHandler(async (req, res) => {
    const { name, department, position, contact } = req.body;

    const bureaucrat = await Bureaucrat.findById(req.params.id);

    if (bureaucrat) {
        bureaucrat.name = name || bureaucrat.name;
        bureaucrat.department = department || bureaucrat.department;
        bureaucrat.position = position || bureaucrat.position;
        bureaucrat.contact = contact || bureaucrat.contact;

        const updatedBureaucrat = await bureaucrat.save();
        res.json(updatedBureaucrat);
    } else {
        res.status(404);
        throw new Error('Bureaucrat not found');
    }
});

module.exports = { getBureaucrats, getBureaucratById, createBureaucrat, updateBureaucrat };