const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Import Axios for making HTTP requests
const app = express();
const fs = require('fs'); // Import the file system module

app.use(bodyParser.json());

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
    const imsUrl = `https://api.ims.gov.il/v1/envista/stations/${selectedArea}/data/from=${formattedDate}&to=${formattedDate}`;


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
      // Write IMS data to a JSON file
      fs.writeFile('ims_data.json', JSON.stringify(imsData), (err) => {
        if (err) throw err;
        console.log('IMS data has been saved to ims_data.json');
      });
      // Further processing and calculations...
      
      // Send the recommendation as response
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
