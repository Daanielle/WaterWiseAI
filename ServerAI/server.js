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
    const { selectedArea, areaSize } = req.body;

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
        console.log("Station Id is:", stationId);
        const lastBatch = decodedData.data[decodedData.data.length - 1];
        console.log('Last Batch:', lastBatch);

        let gradValue = null, ws1mmValue = null, wsMaxValue = null, temperature = null, relativeHumidity = null;

        if (stationId == 381 || stationId == 29 || stationId == 58 || stationId == 79 || stationId == 33 || stationId == 82 || stationId == 28 || stationId == 36) {
          // Find the channel with the name 'Grad'
          const gradChannel = lastBatch.channels.find(channel => channel.name === 'Grad');
          gradValue = gradChannel.value;
          console.log(`Grad: ${gradValue}`);

          // Find the channel with the name 'WS1mm' (Wind Speed at 1mm)
          const ws1mmChannel = lastBatch.channels.find(channel => channel.name === 'WS1mm');
          ws1mmValue = ws1mmChannel.value;
          console.log(`Wind Speed at 1mm: ${ws1mmValue}`);

          // Find the channel with the name 'WSmax' (Maximum Wind Speed)
          const wsMaxChannel = lastBatch.channels.find(channel => channel.name === 'WSmax');
          wsMaxValue = wsMaxChannel.value;
          console.log(`Maximum Wind Speed: ${wsMaxValue}`);

          // Find the channel with name 'TD'
          const tempChannel = lastBatch.channels.find(channel => channel.name === 'TD');
          temperature = tempChannel.value;
          console.log(`Temperature: ${temperature}`);

          // Find the channel with the name 'RH' (Relative Humidity)
          const rhChannel = lastBatch.channels.find(channel => channel.name === 'RH');
          relativeHumidity = rhChannel.value;
          console.log(`Relative Humidity: ${relativeHumidity}`);
        }

        if (stationId == 208 || stationId == 271 || stationId == 338 || stationId == 210 || stationId == 379 || stationId == 232 || stationId == 207 || stationId == 98 || stationId == 112) {
          // Find the channel with the name 'WS1mm' (Wind Speed at 1mm)
          const ws1mmChannel = lastBatch.channels.find(channel => channel.name === 'WS1mm');
          ws1mmValue = ws1mmChannel.value;
          console.log(`Wind Speed at 1mm: ${ws1mmValue}`);

          // Find the channel with the name 'WSmax' (Maximum Wind Speed)
          const wsMaxChannel = lastBatch.channels.find(channel => channel.name === 'WSmax');
          wsMaxValue = wsMaxChannel.value;
          console.log(`Maximum Wind Speed: ${wsMaxValue}`);

          // Find the channel with name 'TD'
          const tempChannel = lastBatch.channels.find(channel => channel.name === 'TD');
          temperature = tempChannel.value;
          console.log(`Temperature: ${temperature}`);

          // Find the channel with the name 'RH' (Relative Humidity)
          const rhChannel = lastBatch.channels.find(channel => channel.name === 'RH');
          relativeHumidity = rhChannel.value;
          console.log(`Relative Humidity: ${relativeHumidity}`);
        }

        if (stationId == 60) {
          // Find the channel with the name 'Grad'
          const gradChannel = lastBatch.channels.find(channel => channel.name === 'Grad');
          gradValue = gradChannel.value;
          console.log(`Grad: ${gradValue}`);

          // Find the channel with name 'TD'
          const tempChannel = lastBatch.channels.find(channel => channel.name === 'TD');
          temperature = tempChannel.value;
          console.log(`Temperature: ${temperature}`);
        }

        if (stationId == 236 || stationId == 350) {
          // Find the channel with name 'TD'
          const tempChannel = lastBatch.channels.find(channel => channel.name === 'TD');
          temperature = tempChannel.value;
          console.log(`Temperature: ${temperature}`);

          // Find the channel with the name 'RH' (Relative Humidity)
          const rhChannel = lastBatch.channels.find(channel => channel.name === 'RH');
          relativeHumidity = rhChannel.value;
          console.log(`Relative Humidity: ${relativeHumidity}`);
        }

        if (stationId == 386) {
          // Find the channel with the name 'Grad'
          const gradChannel = lastBatch.channels.find(channel => channel.name === 'Grad');
          gradValue = gradChannel.value;
          console.log(`Grad: ${gradValue}`);
        }

        // Perform calculations to determine the water recommendation
        const deltaY = computeDeltaY(temperature);
        const Kc = getKc();
        const e0 = computeE0(temperature);
        const ea = computesmallea(relativeHumidity, e0);
        const Ea = computeBigEa(e0, ea, wsMaxValue);
        const E = computeE(deltaY, gradValue, wsMaxValue, Ea);
        const I = computeI(E, Kc, areaSize); // Use areaSize for totalArea
        console.log('I:', I);

        // Send the water recommendation (I) and other calculated values as the response
        res.json({
          grad: gradValue,
          windSpeed1mm: ws1mmValue,
          maxWindSpeed: wsMaxValue,
          temperature: temperature,
          relativeHumidity: relativeHumidity,
          deltaY: deltaY,
          e0: e0,
          ea: ea,
          Ea: Ea,
          E: E,
          Kc: Kc,
          recommendation: I // Final calculation
        });
      });
    } else {
      // Handle error response from the IMS API
      console.error('Error response from IMS API:', imsResponse.status, imsResponse.statusText);
      res.status(imsResponse.status).json({ error: 'An error occurred while fetching data from the IMS API.' });
    }
  } catch (error) {
    console.error('Error during calculation:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
