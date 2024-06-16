const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    userId: String, //{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Optional user reference
    grad: String,
    windSpeed1mm: String,
    maxWindSpeed: String,
    temperature: String,
    relativeHumidity: String,
    deltaY: String,
    e0: String,
    ea: String,
    Ea: String,
    E: String,
    Kc: String,
    recommendation: String
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);
