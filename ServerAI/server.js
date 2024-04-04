const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());

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
  const { גודל_החלקה, data2, data3, data4, data5 } = req.body;

  // Calculate average of the received data
  const dataArray = [גודל_החלקה, data2, data3, data4, data5];
  const averageData = calculateAverage(dataArray);

  // Calculate water recommendation based on average data
  const recommendation = calculateWaterRecommendation(averageData);

  // Send the recommendation as response
  res.json({ recommendation });
});

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false, // true for 465, false for other ports
});

// Route to handle contact form submissions
app.post("/api/contact", (req, res) => {
  // Extract data from request body
  const { name, email, message } = req.body;

  // Send email
  const mailOptions = {
    from: 'ShacharAdam123@gmail.com',
    to: 'ShacharAdam123@gmail.com', // Replace with developer's email
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send message' });
    } else {
      console.log('Message sent:', info.response);
      res.status(200).json({ message: 'Message sent successfully' });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
