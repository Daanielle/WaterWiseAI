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
  console.log(response);
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
    // const { selectedArea, areaSize, KcValue } = req.body;
    const { selectedArea, areaSize } = req.body;
    const lastBatch = await fetchDataFromStation(selectedArea);
    console.log("last batch is here");
    console.log(lastBatch)
    let gradValue = null, ws1mmValue = null, wsMaxValue = null, temperature = null, relativeHumidity = null;
    // Ashalim, Arad, Besor Farm, Dorot, Hazeva, Negba, Neot smadar, Shani, Yotvata
    if (['381', '29', '58', '79', '33', '82', '28', '36'].includes(selectedArea)) {
      const gradChannel = lastBatch.channels.find(channel => channel.name === 'Grad');
      gradValue = gradChannel ? gradChannel.value : null;

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
    const Kc=getKc();
    // const Kc=null;
    // if(KcValue=!null){
    //   Kc = KcValue;
    // }
    // else{
    //    Kc = getKc();
    // }
    
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

const bycodejson = require('../../water-wize-ai/src/resources/bycode2022Updated.json');


const CitiesCities = [];
for (let i = 0; i < bycodejson["קובץ יישובים 2022"].length; i++) {
  CitiesCities.push(bycodejson["קובץ יישובים 2022"][i].EngName);
}

const cityCoordinates = {};

for (let i = 0; i < bycodejson["קובץ יישובים 2022"].length; i++) {
  const city = bycodejson["קובץ יישובים 2022"][i];
  cityCoordinates[city.EngName] = {
    latitude: city.Latitude,
    longitude: city.Longitude,
    closestArea: city.Closest // Include the closest area information
  };
}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  const areaCoordinates = {
    381: { name: 'Ashalim', latitude: 30.983, longitude: 34.708 },
    29: { name: 'Arad', latitude: 31.25, longitude: 35.1855 },
    208: { name: 'Ashkelon', latitude: 31.6394, longitude: 34.5215 },
    271: { name: 'Avdat', latitude: 30.7877, longitude: 34.7712 },
    60: { name: 'Beer Sheva University', latitude: 31.2642, longitude: 34.8045 },
    58: { name: 'Besor Farm', latitude: 31.2716, longitude: 34.38941 },
    79: { name: 'Dorot', latitude: 31.5036, longitude: 34.648 },
    64: { name: 'Eilat', latitude: 29.5526, longitude: 34.952 },
    211: { name: 'Ein Gedi', latitude: 30.4667, longitude: 35.3833 },
    338: { name: 'Ezuz', latitude: 30.7911, longitude: 34.4715 },
    236: { name: 'Gat', latitude: 31.6303, longitude: 34.7913 },
    33: { name: 'Hatzeva', latitude: 30.7787, longitude: 35.2389 },
    350: { name: 'Lahav', latitude: 31.3812, longitude: 34.8729 },
    210: { name: 'Metzoke Dragot', latitude: 31.5881, longitude: 35.3916 },
    379: { name: 'Mitzpe Ramon', latitude: 30.6101, longitude: 34.8046 },
    82: { name: 'Negba', latitude: 31.6585, longitude: 34.6798 },
    232: { name: 'Neot Smadar', latitude: 30.048, longitude: 35.0233 },
    349: { name: 'Nevatim', latitude: 31.205, longitude: 34.9227 },
    207: { name: 'Paran', latitude: 30.3655, longitude: 35.1479 },
    98: { name: 'Sde Boker', latitude: 30.8702, longitude: 34.795 },
    65: { name: 'Sodom', latitude: 31.0306, longitude: 35.3919 },
    28: { name: 'Shani', latitude: 31.3568, longitude: 35.0662 },
    36: { name: 'Yotvata', latitude: 29.8851, longitude: 35.0771 },
    112: { name: 'Zomet HaNegev', latitude: 31.0708, longitude: 34.8513 },
  };

  



const locations = {
    381: 'Ashalim',
    29: 'Arad',
    208: 'Ashkelon',
    271: 'Avdat',
    60: 'Beer Sheva University',
    58: 'Besor Farm',
    79: 'Dorot',
    64: 'Eilat',
    211: 'Ein Gedi',
    338: 'Ezuz',
    236: 'Gat',
    33: 'Hatzeva',
    350: 'Lahav',
    210: 'Metzoke Dragot',
    379: 'Mitzpe Ramon',
    82: 'Negba',
    232: 'Neot Smadar',
    349: 'Nevatim',
    207: 'Paran',
    98: 'Sde Boker',
    65: 'Sodom',
    28: 'Shani',
    36: 'Yotvata',
    112: 'Zomet HaNegev'
  };
  
  const lopsidedlocations = {
    'Ashalim': 381,
    'Arad': 29,
    'Ashkelon': 208,
    'Avdat': 271,
    'Beer Sheva University': 60,
    'Besor Farm': 58,
    'Dorot': 79,
    'Eilat': 64,
    'Ein Gedi': 211,
    'Ezuz': 338,
    'Gat': 236,
    'Hatzeva': 33,
    'Lahav': 350,
    'Metzoke Dragot': 210,
    'Mitzpe Ramon': 379,
    'Negba': 82,
    'Neot Smadar': 232,
    'Nevatim': 349,
    'Paran': 207,
    'Sde Boker': 98,
    'Sodom': 65,
    'Shani': 28,
    'Yotvata': 36,
    'Zomet HaNegev': 112
  }
  
  
  const cities = {};
  
  for (let i = 1; i <= 1264; i++) {
    if (CitiesCities[i - 1]) {
      cities[i] = CitiesCities[i - 1];
    }
  }
  
  const optionsCities = Object.keys(cities).map(key => ({
    value: key,
    label: cities[key]
  }));
  
  const labels = [];
  
  for (const key in optionsCities) {
    labels.push(optionsCities[key].label);
  }
// Route handler for /calculator/geolocation
router.post('/coordinates', async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request body:", req.body);

    const userLatitude = req.body.latitude;
    const userLongitude = req.body.longitude;
    console.log("Received coordinates:", userLatitude, userLongitude);

    // Logic to determine closest area based on user's geolocation
    let closestArea = null;
    let minDistanceArea = Infinity;

    for (const areaId in areaCoordinates) {
      const area = areaCoordinates[areaId];
      const dist = calculateDistance(
        userLatitude,
        userLongitude,
        area.latitude,
        area.longitude
      );
      if (dist < minDistanceArea) {
        minDistanceArea = dist;
        closestArea = { ...area, id: areaId }; // Include area ID in response if needed
      }
    }

    // Logic to determine closest city based on user's geolocation
    let closestCity = null;
    let minDistanceCity = Infinity;

    for (const cityName in cityCoordinates) {
      const city = cityCoordinates[cityName];
      const dist = calculateDistance(
        userLatitude,
        userLongitude,
        city.latitude,
        city.longitude
      );
      if (dist < minDistanceCity) {
        minDistanceCity = dist;
        closestCity = cityName;
      }
    }

    // Respond with the closest area and city data
    res.json({ closestArea, closestCity });
  } catch (error) {
    console.error("Error in /coordinates:", error);
    res.status(500).json({ error: 'Internal server error' });
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
            recommendation,
            station
        } = req.body.recommendation;

        //console.log(mongoose.Types.ObjectId.isValid(req.body.userId))
        // Validate userId format
        // if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
        //     return res.status(400).json({ error: 'Invalid userId format' });
        // }

        // Create a new recommendation document
        const newRecommendation = new Recommendation({
            userId: userId, // Save the user ID as a string
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
            recommendation: recommendation,
            station: station
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
    const recommendations = await Recommendation.find({ userId: userId });
    // Send the recommendations as JSON response
    res.status(200).json(recommendations);
  } catch (err) {
    // Handle errors if any occur
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
