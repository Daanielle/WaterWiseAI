// const mongoose = require('mongoose');

// const recommendationSchema = new mongoose.Schema({
//     userId: String, //{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Optional user reference
//     grad: String,
//     windSpeed1mm: String,
//     maxWindSpeed: String,
//     temperature: String,
//     relativeHumidity: String,
//     deltaY: String,
//     e0: String,
//     ea: String,
//     Ea: String,
//     E: String,
//     Kc: String,
//     recommendation: String,
//     station:String
// }, { timestamps: true });

// module.exports = mongoose.model('Recommendation', recommendationSchema);
const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
    recommendation: Number,
    station: String
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);
