const mongoose = require('mongoose');

const fecthDataSchema = new mongoose.Schema({
    stationName: { type: String, unique: true }, // Assuming stationName is unique and serves as the ID
    gradient: Number,
    windSpeed1: Number,
    maxWind: Number,
    temp: Number,
    relHumidity: Number,
}, { timestamps: true });

module.exports = mongoose.model('fecthData', fecthDataSchema);
