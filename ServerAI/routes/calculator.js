const express = require('express');
const router = express.Router();
const axios = require('axios');
// const Recommendation = require('../models/Recommendation'); // Import the Recommendation model
const Recommendation = require('../models/recommendation');
const authenticateToken = require('../middleware/auth'); // Assuming you have this middleware
const mongoose = require('mongoose');

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

  const closest = deltaYTable.reduce((prev, curr) => {
    return Math.abs(curr.temp - temperature) < Math.abs(prev.temp - temperature) ? curr : prev;
  });

  return closest.deltaY;
}

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

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  return kcTable[currentMonth];
}

function computeE0(temperature) {
  const T = temperature;
  const e0 = 6.2 * Math.exp((17.26 * T) / (T - 35.8 + 273.16));
  return e0;
}

function computesmallea(relativeHumidity, e0) {
  const ea = (relativeHumidity / 100) * e0;
  return ea;
}

function computeBigEa(e0, ea, WS) {
  const C = 1 / (3);
  const Ea = 0.35 * (e0 - ea) * (0.5 + 0.54 * WS) * C;
  return Ea;
}

function computeE(deltaY, Grad, WSmax, Ea) {
  const L = 2.45 * Math.pow(10, 9);
  const E = ((deltaY * (Grad - WSmax) + Ea * L) / (deltaY + 1)) / L;
  return E;
}

function computeI(E, Kc, totalArea) {
  const I = E * Kc * totalArea;
  return I;
}

async function fetchDataFromStation(stationId) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  const formattedDate = currentDate.toISOString().slice(0, 10);
  const imsUrl = `https://api.ims.gov.il/v1/envista/stations/${stationId}/data/daily`;

  const response = await axios.get(imsUrl, {
    headers: {
      Authorization: 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47'
    }
  });

  if (response.status >= 200 && response.status < 300) {
    const data = response.data;
    console.log("abc")
    console.log(data)
    const lastBatch = data.data[data.data.length - 1];
    return lastBatch;
  } else {
    throw new Error(`Error fetching data from station ${stationId}`);
  }
}


// router.post("/calculate", authenticateToken, async (req, res) => {
router.post('/calculate', async (req, res) => {
  try {
    const { selectedArea, areaSize } = req.body;
    const lastBatch = await fetchDataFromStation(selectedArea);

    let gradValue = null, ws1mmValue = null, wsMaxValue = null, temperature = null, relativeHumidity = null;
    // Ashalim, Arad, Besor Farm, Dorot, Hazeva, Negba, Neot smadar, Shani, Yotvata
    if (['381', '29', '58', '79', '33', '82', '28', '36'].includes(selectedArea)) {
      const gradChannel = lastBatch.channels.find(channel => channel.name === 'Grad');
      gradValue = gradChannel ? gradChannel.value : null;
      console.log(gradValue)

      const ws1mmChannel = lastBatch.channels.find(channel => channel.name === 'WS1mm');
      ws1mmValue = ws1mmChannel ? ws1mmChannel.value : null;

      const wsMaxChannel = lastBatch.channels.find(channel => channel.name === 'WSmax');
      wsMaxValue = wsMaxChannel ? wsMaxChannel.value : null;

      const tempChannel = lastBatch.channels.find(channel => channel.name === 'TD');
      temperature = tempChannel ? tempChannel.value : null;

      const rhChannel = lastBatch.channels.find(channel => channel.name === 'RH');
      relativeHumidity = rhChannel ? rhChannel.value : null;
    }

    // Ashqelon Port, Avdat, Ezuz, Metzoke Dragot, Mizpe Ramon, Neot Smadar, Paran, Sede Boqer, Zomet Hanegev
    if (['208', '271', '338', '210', '379', '232', '207', '98', '112'].includes(selectedArea)) {
      const ws1mmChannel = lastBatch.channels.find(channel => channel.name === 'WS1mm');
      ws1mmValue = ws1mmChannel ? ws1mmChannel.value : null;

      const wsMaxChannel = lastBatch.channels.find(channel => channel.name === 'WSmax');
      wsMaxValue = wsMaxChannel ? wsMaxChannel.value : null;

      const tempChannel = lastBatch.channels.find(channel => channel.name === 'TD');
      temperature = tempChannel ? tempChannel.value : null;

      const rhChannel = lastBatch.channels.find(channel => channel.name === 'RH');
      relativeHumidity = rhChannel ? rhChannel.value : null;
    }

    // Beer Sheva University 
    if (selectedArea == '60') {
      const gradChannel = lastBatch.channels.find(channel => channel.name === 'Grad');
      gradValue = gradChannel ? gradChannel.value : null;

      const tempChannel = lastBatch.channels.find(channel => channel.name === 'TD');
      temperature = tempChannel ? tempChannel.value : null;
    }

    // Gat, Lahav
    if (selectedArea == '236' || selectedArea == '350') {
      const tempChannel = lastBatch.channels.find(channel => channel.name === 'TD');
      temperature = tempChannel ? tempChannel.value : null;

      const rhChannel = lastBatch.channels.find(channel => channel.name === 'RH');
      relativeHumidity = rhChannel ? rhChannel.value : null;
    }

    if (selectedArea == '386') {
      const gradChannel = lastBatch.channels.find(channel => channel.name === 'Grad');
      gradValue = gradChannel ? gradChannel.value : null;
    }

    if (!gradValue || !ws1mmValue || !wsMaxValue || !temperature || !relativeHumidity) {
      let nearbyStationId = null;

      console.log("gradValue: " + gradValue)
      console.log("ws1mmValue: " + ws1mmValue)
      console.log("wsMaxValue: " + wsMaxValue)
      console.log("temperature: " + temperature)
      console.log("relativeHumidity: " + relativeHumidity)

      if (selectedArea == '208') { // Ashqelon Port
        nearbyStationId = '82'; // Negba
      } else if (['271', '98', '112', '338', '379'].includes(selectedArea)) { // Avdat, Sede Boqer, Zomet Hanegev, Ezuz, Mizpe Ramon
        nearbyStationId = '381'; // Ashalim
      } else if (['207', '232'].includes(selectedArea)) { // Paran, Neot Smadar
        nearbyStationId = '36'; // Yotvata
      } else if (selectedArea == '210') { // Metzoke Dragot
        nearbyStationId = '28'; // Shani
      } else if (selectedArea == '236') { // Gat
        nearbyStationId = '79'; // Dorot
      } else if (selectedArea == '350') { // Lahav
        nearbyStationId = '28'; // Shani
      } else if (selectedArea == '60') { // Beer Sheva University
        nearbyStationId = '28'; // Shani
      }

      if (nearbyStationId) {
        try {
          const nearbyLastBatch = await fetchDataFromStation(nearbyStationId);

          if (!gradValue) {
            const gradChannel = nearbyLastBatch.channels.find(channel => channel.name === 'Grad');
            gradValue = gradChannel ? gradChannel.value : null;
          }

          if (!ws1mmValue) {
            const ws1mmChannel = nearbyLastBatch.channels.find(channel => channel.name === 'WS1mm');
            ws1mmValue = ws1mmChannel ? ws1mmChannel.value : null;
          }

          if (!wsMaxValue) {
            const wsMaxChannel = nearbyLastBatch.channels.find(channel => channel.name === 'WSmax');
            wsMaxValue = wsMaxChannel ? wsMaxChannel.value : null;
          }

          if (!relativeHumidity) {
            const rhChannel = nearbyLastBatch.channels.find(channel => channel.name === 'RH');
            relativeHumidity = rhChannel ? rhChannel.value : null;
          }
        } catch (error) {
          console.error('Error fetching data from nearby station:', error);
          res.status(500).json({ error: 'An error occurred while fetching data from a nearby station.' });
          return;
        }

      }
    }

    const deltaY = computeDeltaY(temperature);
    const Kc = getKc();
    const e0 = computeE0(temperature);
    const ea = computesmallea(relativeHumidity, e0);
    const Ea = computeBigEa(e0, ea, wsMaxValue);
    const E = computeE(deltaY, gradValue, wsMaxValue, Ea);
    const I = computeI(E, Kc, areaSize);

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
      recommendation: I
    });
  } catch (error) {
    console.error('Error during calculation:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});



router.post('/recommendations', async (req, res) => {
    try {
        const {
            userId,
            grad,
            windSpeed1mm,
            maxWindSpeed,
            temperature,
            relativeHumidity,
            deltaY,
            e0,
            ea,
            Ea,
            E,
            Kc,
            recommendation
        } = req.body;

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid userId format' });
        }

        // Create a new recommendation document
        const newRecommendation = new Recommendation({
            user: userId, // Save the user ID as a string
            grad: grad,
            windSpeed1mm: windSpeed1mm,
            maxWindSpeed: maxWindSpeed,
            temperature: temperature,
            relativeHumidity: relativeHumidity,
            deltaY: deltaY,
            e0: e0,
            ea: ea,
            Ea: Ea,
            E: E,
            Kc: Kc,
            recommendation: recommendation
        });

        // Save the document to the database
        const savedRecommendation = await newRecommendation.save();

        // Send a response to the client
        res.status(201).json(savedRecommendation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// Route to retrieve recommendations for a specific user
router.get('/recommendations', async (req, res) => {
  const userId = req.query.userId;

  try {
    if (!userId) {
      // If userId parameter is missing, return 400 Bad Request
      return res.status(400).json({ error: 'userId parameter is required' });
    }

    // Find recommendations by userId in the database
    const recommendations = await Recommendation.find({ user: userId });

    // Send the recommendations as JSON response
    res.status(200).json(recommendations);
  } catch (err) {
    // Handle errors if any occur
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
