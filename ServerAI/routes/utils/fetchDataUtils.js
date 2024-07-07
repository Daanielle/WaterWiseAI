const FetchData = require('../../models/fecthData'); // Adjust path as per your project structure

async function saveOrUpdateData(data) {
  const { stationName, gradient, windSpeed1, maxWind, temp, relHumidity } = data;

  try {
    // Try to find the station by stationName
    let fetchData = await FetchData.findOne({ stationName });

    if (!fetchData) {
      // If station doesn't exist, create a new entry
      fetchData = new FetchData({
        stationName,
        gradient,
        windSpeed1,
        maxWind,
        temp,
        relHumidity
      });
    } else {
      // If station exists, update the existing entry
      fetchData.gradient = gradient;
      fetchData.windSpeed1 = windSpeed1;
      fetchData.maxWind = maxWind;
      fetchData.temp = temp;
      fetchData.relHumidity = relHumidity;
    }

    // Save the data (whether new or updated)
    await fetchData.save();
    console.log(`Data for station ${stationName} saved/updated successfully.`);
  } catch (error) {
    console.error(`Error saving/updating data for station ${stationName}: ${error.message}`);
    throw error;
  }
}

module.exports = {
  saveOrUpdateData
};
