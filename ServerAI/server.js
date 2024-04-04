const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Import Axios for making HTTP requests
const app = express();

app.use(bodyParser.json());

// Route to handle the POST request for calculating water recommendation
app.post("/api/calculate", async (req, res) => {
  try {
    // Extract agricultural data and selected area number from request body
    const { data1, data2, data3, data4, data5, selectedArea } = req.body;

    // Make the API call to IMS based on the selected area number and the provided date
    const imsUrl = `https://api.ims.gov.il/v1/envista/stations/${selectedArea}/data?from=2023/08/01&to=2023/08/10`;
    const imsResponse = await axios.get(imsUrl, {
      headers: {
        Authorization: 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47' // Add your IMS API token here
      }
    });

    // Check if the API call was successful
    if (imsResponse.status >= 200 && imsResponse.status < 300) {
      // Process the IMS API response to calculate the water recommendation
      const imsData = imsResponse.data;

      // Define a function to calculate the average temperature
      // (Your existing calculation logic)
      
      // Calculate the average temperature, relative humidity, and wind speed
      // (Your existing calculation logic)
      
      // Perform further calculations based on the averages
      // (Your existing calculation logic)

      // Send the recommendation as response
      console.log(imsData)
      res.json({ recommendation });
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
