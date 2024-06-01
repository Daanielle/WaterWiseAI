const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Import Axios for making HTTP requests
const app = express();
const fs = require('fs'); // Import the file system module

app.use(bodyParser.json());

function computeDeltaY(temperature) {
  const deltaYTable = [
    { temp: 0, deltaY: 1.456 },
    { temp: 5, deltaY: 1.067 },
    { temp: 10, deltaY: 0.7934 },
    { temp: 15, deltaY: 0.5967 },
    { temp: 20, deltaY: 0.4549 },
    { temp: 25, deltaY: 0.3505 },
    { temp: 30, deltaY: 0.2731 },
    { temp: 35, deltaY: 0.2149 },
    { temp: 40, deltaY: 0.1707 }
  ];

  // Find the closest temperature in the table
  const closest = deltaYTable.reduce((prev, curr) => {
    return Math.abs(curr.temp - temperature) < Math.abs(prev.temp - temperature) ? curr : prev;
  });

  return closest.deltaY;
}

// Function to get the irrigation coefficient (Kc) based on the current month
function getKc() {
  const kcTable = {
    January: 0.62,
    February: 0.61,
    March: 0.63,
    April: 1.2,
    May: 1.25,
    June: 1.3,
    July: 1.3,
    August: 0.35,
    September: 0.35,
    October: 0.67,
    November: 0.65,
    December: 0.65
  };

  // Get the current month as a string
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  return kcTable[currentMonth];
}


function computeE0(temperature) {
  const T = temperature;
  const e0 = 6.2 * Math.exp((17.26 * T) / (T - 35.8 + 273.16));
  return e0;
}

// Function to compute ea, now taking e0 as a parameter
function computesmallea(relativeHumidity, e0) {
  const ea = (relativeHumidity / 100) * e0;
  return ea;
}

// Function to compute Ea
function computeBigEa(e0, ea, WS) {
  const C = 1 / (24 * 3600 * 1000); // constant C
  const Ea = 0.35 * (e0 - ea) * (0.5 + 0.54 * WS) * C;
  return Ea;
}

// Function to compute E
function computeE(deltaY, Grad, WSmax, Ea) {
  const L = 2.45 * Math.pow(10, 9); // constant L
  const E = ((deltaY * (Grad - WSmax) + Ea * L) / (deltaY + 1)) / L;
  return E;
}

// Function to compute I
function computeI(E, Kc, totalArea) {
  const I = E * Kc * totalArea;
  return I;
}



// Route to handle the POST request for calculating water recommendation
app.post("/api/calculate", async (req, res) => {
  try {
    // Extract agricultural data and selected area number from request body
    const { data1, data2, data3, data4, data5, selectedArea } = req.body;
    console.log(selectedArea)
    // Construct the API URL with the selected area number and the current date range
    // Construct the API URL with the selected area number and the previous day's date
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // Get the date of the previous day
    const formattedDate = currentDate.toISOString().slice(0, 10); // Format the date as "YYYY-MM-DD"
    const imsUrl = `https://api.ims.gov.il/v1/envista/stations/${selectedArea}/data/daily`;

    // Make the API call to IMS
    const imsResponse = await axios.get(imsUrl, {
      headers: {
        Authorization: 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47' // Add your IMS API token here
      }
    });

    // Check if the API call was successful
    if (imsResponse.status >= 200 && imsResponse.status < 300) {
      // Process the IMS API response to calculate the water recommendation
      const imsData = imsResponse.data;

      // Encode the IMS data
      const encodedData = JSON.stringify(imsData);

      // Write encoded IMS data to a JSON file
      fs.writeFile('encoded_ims_data.json', encodedData, (err) => {
        if (err) {
          console.error('Error writing encoded IMS data:', err);
          res.status(500).json({ error: 'An error occurred while processing the request.' });
          return;
        }
        console.log('Encoded IMS data has been saved to encoded_ims_data.json');
      
        // Decode the IMS data to retrieve the last batch
        const decodedData = JSON.parse(encodedData);
        // Access the stationId property
        const stationId = decodedData.stationId;
        console.log("Statio Id is:")
        console.log(stationId);
        const lastBatch = decodedData.data[decodedData.data.length - 1];
        console.log('Last Batch:', lastBatch);

        if (stationId == 1 || stationId == 2){
          // Computations for stations with all categories
          console.log("Categories: Grad, WS, WSmax, TD, RH");
          // Add computations for this category
          console.log("Computations for stations with all categories");
          
          // Find the channel with the name 'Grad'
          const gradChannel = lastBatch.channels.find(channel => channel.name === 'Grad');
          const gradValue = gradChannel.value;
          console.log(`Grad: ${gradValue}`);

          // Find the channel with the name 'WS1mm' (Wind Speed at 1mm)
          const ws1mmChannel = lastBatch.channels.find(channel => channel.name === 'WS1mm');
          const ws1mmValue = ws1mmChannel.value;
          console.log(`Wind Speed at 1mm: ${ws1mmValue}`);

          // Find the channel with the name 'WSmax' (Maximum Wind Speed)
          const wsMaxChannel = lastBatch.channels.find(channel => channel.name === 'WSmax');
          const wsMaxValue = wsMaxChannel.value;
          console.log(`Maximum Wind Speed: ${wsMaxValue}`);

          // Find the channel with name 'TD'
          const tempChannel = lastBatch.channels.find(channel => channel.name === 'TD');
          const temperature = tempChannel.value;
          console.log(`Temperature: ${temperature}`);

          // Find the channel with the name 'RH' (Relative Humidity)
          const rhChannel = lastBatch.channels.find(channel => channel.name === 'RH');
          const relativeHumidity = rhChannel.value;
          console.log(`Relative Humidity: ${relativeHumidity}`);
        }

        if (stationId == 3 || stationId == 4){
          // Computations for stations missing Grad only
          console.log("Categories: WS, WSmax, TD, RH");
          // Add computations for this category
          console.log("Computations for stations missing grad");

          // Find the channel with the name 'WS1mm' (Wind Speed at 1mm)
          const ws1mmChannel = lastBatch.channels.find(channel => channel.name === 'WS1mm');
          const ws1mmValue = ws1mmChannel.value;
          console.log(`Wind Speed at 1mm: ${ws1mmValue}`);

          // Find the channel with the name 'WSmax' (Maximum Wind Speed)
          const wsMaxChannel = lastBatch.channels.find(channel => channel.name === 'WSmax');
          const wsMaxValue = wsMaxChannel.value;
          console.log(`Maximum Wind Speed: ${wsMaxValue}`);

          // Find the channel with name 'TD'
          const tempChannel = lastBatch.channels.find(channel => channel.name === 'TD');
          const temperature = tempChannel.value;
          console.log(`Temperature: ${temperature}`);

          // Find the channel with the name 'RH' (Relative Humidity)
          const rhChannel = lastBatch.channels.find(channel => channel.name === 'RH');
          const relativeHumidity = rhChannel.value;
          console.log(`Relative Humidity: ${relativeHumidity}`);
        }

        if (stationId == 5 || stationId == 6){
          // Computations for stations that only have Grad and TD
          console.log("Categories: Grad, TD");
          // Add computations for this category
          console.log("Computations for stations that only have grad and TD");

          // Find the channel with the name 'Grad'
          const gradChannel = lastBatch.channels.find(channel => channel.name === 'Grad');
          const gradValue = gradChannel.value;
          console.log(`Grad: ${gradValue}`);

          // Find the channel with name 'TD'
          const tempChannel = lastBatch.channels.find(channel => channel.name === 'TD');
          const temperature = tempChannel.value;
          console.log(`Temperature: ${temperature}`);
        }

        if (stationId == 7 || stationId == 8){
          // Computations for stations that only have TD and RH
          console.log("Categories: TD, RH");
          // Add computations for this category
          console.log("Computations for stations that only have TD and RH");

          // Find the channel with name 'TD'
          const tempChannel = lastBatch.channels.find(channel => channel.name === 'TD');
          const temperature = tempChannel.value;
          console.log(`Temperature: ${temperature}`);

          // Find the channel with the name 'RH' (Relative Humidity)
          const rhChannel = lastBatch.channels.find(channel => channel.name === 'RH');
          const relativeHumidity = rhChannel.value;
          console.log(`Relative Humidity: ${relativeHumidity}`);
        }


      
        // Calculate the maximum value of the channels in the last batch
        const channels = lastBatch.channels;
        const values = channels.map(channel => channel.value);
        const maxValue = Math.max(...values);
        console.log('Max Value:', maxValue);
      
        // Send the maximum value as response
        res.json({ recommendation: maxValue });
      });
    } else {
      // Handle the case where the API call was not successful
      console.error('IMS API request failed with status:', imsResponse.status);
      res.status(500).json({ error: 'IMS API request failed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

// Your existing code...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
