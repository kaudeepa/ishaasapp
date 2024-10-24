const mongoose = require('mongoose');

const bureaucratSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    contact: { type: String },
    averageRating: { type: Number, default: 0 },
});

const Bureaucrat = mongoose.model('Bureaucrat', bureaucratSchema);
module.exports = Bureaucrat;
