const cron = require('node-cron');
const axios = require('axios');
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

// async function fetchDataFromStation(stationId, date) {
//     // const currentDate = new Date();
//     // currentDate.setDate(currentDate.getDate() - 1);
//     // date.setDate(date.getDate() + 1)
//     let formattedDate;
//     if (date instanceof Date){
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//       const day = String(date.getDate()).padStart(2, '0');
      
//       formattedDate = `${year}/${month}/${day}`;  
//     } else {
//      formattedDate = date.slice(0, 10).replace(/-/g, "/"); // change date format to YYYY/MM/DD
//     }
  
//     const imsUrl = `https://api.ims.gov.il/v1/envista/stations/${stationId}/data/daily/${formattedDate}`;
//     const response = await axios.get(imsUrl, {
//       headers: {
//         Authorization: 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47'
//       }
//     });
//     if (response.status >= 200 && response.status < 300) {
//       if(response.status != 204){
//         const data = response.data;
//         const lastBatch = data.data[data.data.length - 1];
//         return lastBatch;
//       }
//     } 
//     else {
//       throw new Error(`Error fetching data from station ${stationId}`);
//     }
//   }
async function fetchDataFromStation(stationId, date) {
    let formattedDate;
    if (date instanceof Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        formattedDate = `${year}/${month}/${day}`;
    } else {
        formattedDate = date.slice(0, 10).replace(/-/g, "/");
    }

    const imsUrl = `https://api.ims.gov.il/v1/envista/stations/${stationId}/data/daily/${formattedDate}`;

    try {
        const response = await axios.get(imsUrl, {
            headers: {
                Authorization: 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47'
            }
        });

        if (response.status >= 200 && response.status < 300) {
            const data = response.data;
            if (data && data.data && data.data.length > 0) {
                const lastBatch = data.data[data.data.length - 1];

                // Initialize variables
                let gradValue = null;
                let ws1mmValue = null;
                let wsMaxValue = null;
                let temperature = null;
                let relativeHumidity = null;

                // Extract channel values if they exist
                const gradChannel = lastBatch.channels.find(channel => channel.name === 'Grad');
                if (gradChannel) gradValue = gradChannel.value;

                const ws1mmChannel = lastBatch.channels.find(channel => channel.name === 'WS1mm');
                if (ws1mmChannel) ws1mmValue = ws1mmChannel.value;

                const wsMaxChannel = lastBatch.channels.find(channel => channel.name === 'WSmax');
                if (wsMaxChannel) wsMaxValue = wsMaxChannel.value;

                const tempChannel = lastBatch.channels.find(channel => channel.name === 'TD');
                if (tempChannel) temperature = tempChannel.value;

                const rhChannel = lastBatch.channels.find(channel => channel.name === 'RH');
                if (rhChannel) relativeHumidity = rhChannel.value;

                return {
                    gradValue,
                    ws1mmValue,
                    wsMaxValue,
                    temperature,
                    relativeHumidity
                };
            } else {
                console.log(`No valid data fetched for ${stationId} on ${formattedDate}`);
                return {
                    gradValue: null,
                    ws1mmValue: null,
                    wsMaxValue: null,
                    temperature: null,
                    relativeHumidity: null
                };
            }
        } else {
            throw new Error(`Error fetching data from station ${stationId}`);
        }
    } catch (error) {
        console.error(`Error fetching data from station ${stationId}:`, error.message);
        throw error;
    }
}

// Schedule tasks every minute for testing '* * * * *'
//'0 14,16 * * *' for 14:00 and 16:00 everyday
cron.schedule('0 14,16 * * *', async () => {
    try {
        // Fetch data and save for all stations
        const stations = ['381','29','208','271','60','58','79' ,'64','211','338','236','33','350','210','379','82','232','349','207','98','65','28','36','112']; // Replace with your station names
        const currentDate = new Date(); // Today's date

        for (let selectedArea of stations) {
            const {
                gradValue,
                ws1mmValue,
                wsMaxValue,
                temperature,
                relativeHumidity
            } = await fetchDataFromStation(selectedArea, currentDate);

            // Check if all required values are valid before saving
            if (gradValue !== null && ws1mmValue !== null && wsMaxValue !== null && temperature !== null && relativeHumidity !== null) {
                await saveOrUpdateData({
                    stationName: selectedArea,
                    gradient: gradValue,
                    windSpeed1: ws1mmValue,
                    maxWind: wsMaxValue,
                    temp: temperature,
                    relHumidity: relativeHumidity
                });
                console.log(`Fetched and saved data for ${selectedArea} on ${currentDate.toISOString().slice(0, 10)}`);
            } else {
                console.log(`No valid data fetched for ${selectedArea} on ${currentDate.toISOString().slice(0, 10)}`);
            }
        }

        console.log('Scheduled task completed.');
    } catch (error) {
        console.error('Error occurred:', error);
    }
});

// Function to fetch data from MongoDB
async function fetchDataFromDb(stationName) {
    try {
        const result = await FetchData.findOne({ stationName }).exec();
        console.log("Data retrieved from MongoDB:", result);
        return result;
        // return await FetchData.findOne({ stationName: stationName }).exec();
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return null;
    }
}
  module.exports = {
    saveOrUpdateData,
    fetchDataFromDb
    // cron // Export cron instance for testing or other modules
  };