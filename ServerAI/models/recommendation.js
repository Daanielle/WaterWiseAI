const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Optional user reference
    grad: Number,
    windSpeed1mm: Number,
    maxWindSpeed: Number,
    temperature: Number,
    relativeHumidity: Number,
    deltaY: Number,
    e0: Number,
    ea: Number,
    Ea: Number,
    E: Number,
    Kc: Number,
    recommendation: Number
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);
