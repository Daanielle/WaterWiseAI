const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// // Route to handle the POST request for calculating water recommendation
// app.post("/api/calculate", (req, res) => {
//     // Assuming you perform some calculations here based on the received data
//     const agriculturalData = req.body;
//     // Dummy calculation for water recommendation
//     const recommendation = 'Dummy water recommendation'; // Replace with actual calculation
//     res.json({ recommendation });
// });
// Define a function to calculate the average of an array of numbers
function calculateAverage(dataArray) {
  const sum = dataArray.reduce((acc, currentValue) => acc + parseFloat(currentValue), 0);
  return sum / dataArray.length;
}

// Define a function to calculate the water recommendation based on the average data
function calculateWaterRecommendation(averageData) {
  // This is just a dummy logic, replace with your actual calculation
  if (averageData < 10) {
      return averageData + ' Increase water intake';
  } else if (averageData >= 10 && averageData < 20) {
      return averageData+ ' Maintain water intake';
  } else {
      return averageData + ' Decrease water intake';
  }
}

// Route to handle the POST request for calculating water recommendation
app.post("/api/calculate", (req, res) => {
  // Extract agricultural data from request body
  const { data1, data2, data3, data4, data5 } = req.body;

  // Calculate average of the received data
  const dataArray = [data1, data2, data3, data4, data5];
  const averageData = calculateAverage(dataArray);

  // Calculate water recommendation based on average data
  const recommendation = calculateWaterRecommendation(averageData);

  // Send the recommendation as response
  res.json({ recommendation });
});


// // Serve static files from the 'build' folder
// app.use(express.static('build'));

// // Catch-all route to serve the React app
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server started on port ${PORT}");
});