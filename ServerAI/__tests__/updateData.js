const mongoose = require('mongoose');
const FetchData = require('../models/fecthData'); // Adjust path as needed

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/WaterWiseDB', { useNewUrlParser: true, useUnifiedTopology: true });

async function saveOrUpdateData() {
    const stationId = '211'; // Station ID to insert or update

    // Data to be inserted or updated
    const data = {
        stationName: stationId,
        gradient: 700,
        windSpeed1: 5.6,
        maxWind: 7.1,
        temp: 32.2,
        relHumidity: 57
    };

    try {
        // Find or create a new document
        let fetchData = await FetchData.findOneAndUpdate(
            { stationName: stationId },
            data,
            { new: true, upsert: true } // `upsert: true` creates a new document if no match is found
        );

        console.log(`Document for station ${stationId} has been saved/updated successfully.`);
        console.log(fetchData);
    } catch (error) {
        console.error(`Error saving/updating document for station ${stationId}: ${error.message}`);
    } finally {
        // Disconnect from MongoDB
        mongoose.disconnect();
    }
}

saveOrUpdateData();
