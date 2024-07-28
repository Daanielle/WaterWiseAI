const express = require('express');
const router = express.Router();
const axios = require('axios');
const Recommendation = require('../models/recommendation');
// const authenticateToken = require('../middleware/auth'); // Assuming you have this middleware
const mongoose = require('mongoose');
const dataService = require('./utils/fetchDataUtils'); // Adjust path as per your project structure
const {computeDeltaY, getKc, computeE0, computesmallea, computeBigEa, computeE, computeI } = require('./utils/calculatorUtils');

async function fetchDataFromStation(stationId, date) {
  // const currentDate = new Date();
  // currentDate.setDate(currentDate.getDate() - 1);
  // date.setDate(date.getDate() + 1)
  let formattedDate;
  if (date instanceof Date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    
    formattedDate = `${year}/${month}/${day}`;  
  } else {
   formattedDate = date.slice(0, 10).replace(/-/g, "/"); // change date format to YYYY/MM/DD
  }

  const imsUrl = `https://api.ims.gov.il/v1/envista/stations/${stationId}/data/daily/${formattedDate}`;
  const response = await axios.get(imsUrl, {
    headers: {
      Authorization: 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47'
    }
  });
  let lastBatch = null
  // Check if the date is defined, if not, create the current date
  if (response.status >= 200 && response.status < 300) {
    if(response.status != 204){
      const data = response.data;
      if (!data.date) {
        data.date = new Date().toISOString();
      }
      if (data && data.data && data.data.length > 1) {
        const lastBatch = data.data[data.data.length - 1];
        return lastBatch;
    } else if (data && data.data && data.data.length === 1) {
        const lastBatch = data.data[0];
        return lastBatch;
    } else {
      if (!lastBatch) {
        console.error("Data from the station is not available. Fetching from MongoDB.");
        const mongoData = await dataService.fetchDataFromDb(stationId);
        console.log(stationId);
        if (mongoData) {
                  console.log(`Temperature: ${mongoData.temp}`);

            lastBatch = {
                channels: [
                    { name: 'Grad', value: mongoData.gradient },
                    { name: 'ws1mm', value: mongoData.windSpeed1 },
                    { name: 'wsMax', value: mongoData.maxWind },
                    { name: 'TD', value: mongoData.temp },
                    { name: 'RH', value: mongoData.relHumidity },
                ]
            };
        } else {
            console.error("No data found in MongoDB for the selected area.");
            return null;
        }
    }
    }
      // const lastBatch = data.data[data.data.length - 1];
      return lastBatch;
    }
  } 
  else {
    throw new Error(`Error fetching data from station ${stationId}`);
  }
}

const ort = require('onnxruntime-node');
const path = require('path');

const app = express();
app.use(express.json());

const modelPaths = {
  Grad1: path.join(__dirname, 'OnxModels', 'random_forest_regressor_model_Grad1.onnx'),
  Grad2: path.join(__dirname, 'OnxModels', 'random_forest_regressor_model_Grad2.onnx'),
  Grad3: path.join(__dirname, 'OnxModels', 'random_forest_regressor_model_Grad3.onnx'),
  Grad4: path.join(__dirname, 'OnxModels', 'random_forest_regressor_model_Grad4.onnx'),
};

async function loadModel(modelPath) {
  return await ort.InferenceSession.create(modelPath);
}

const models = {};
for (const [key, path] of Object.entries(modelPaths)) {
  models[key] = loadModel(path);
}


router.post('/calculate', async (req, res) => {
  try {
    let { selectedArea, areaSize, date, userKc } = req.body;
    let lastBatch;
    // if date if future >> /predict 

    let formattedDate;
    if (date instanceof Date){
      const year = date.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(currentDate.getDate()).padStart(2, '0');
      
      formattedDate = `${year}/${month}/${day}`;  
    } else {
     formattedDate = date.slice(0, 10).replace(/-/g, "/"); // change date format to YYYY/MM/DD
    }

    console.log(formattedDate)

  
    const dateToCheck = new Date(date);
    const currentDate = new Date();
    dateToCheck.setUTCHours(0, 0, 0, 0);
    currentDate.setUTCHours(0, 0, 0, 0);


    if (dateToCheck <= currentDate) {
      lastBatch = await fetchDataFromStation(selectedArea, date);
      console.log("The date is not later than today.");
      selectedArea = String(selectedArea)
      let gradValue = null, ws1mmValue = null, wsMaxValue = null, temperature = null, relativeHumidity = null;
      // Ashalim, Arad, Besor Farm, Dorot, Hazeva, Negba, Neot smadar, Shani, Yotvata
      if (['381', '29', '58', '79', '33', '82', '28', '36', '64', '65', '211', '349'].includes(selectedArea)) {
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
        } else if (selectedArea == '33') { // Hazeva
          nearbyStationId = '271'; // Avdat
        } else if (selectedArea == '349') { // Nevatim
          nearbyStationId = '60'; // Beer Sheva University
        }

        if (nearbyStationId) {
          try {
            const nearbyLastBatch = await fetchDataFromStation(nearbyStationId, date);

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
            // const gradValue = (Math.random() * (0.2 - 0.05) + 0.05).toFixed(3); // Plausible range for Grad
            // const ws1mmValue = (Math.random() * (5 - 1) + 1).toFixed(3); // Plausible range for WS1mm
            // const wsMaxValue = (Math.random() * (10 - 2) + 2).toFixed(3); // Plausible range for WSmax
            // const temperature = (Math.random() * (40 - 25) + 25).toFixed(3); // Plausible range for Temperature
            // const relativeHumidity = (Math.random() * (80 - 20) + 20).toFixed(3); // Plausible range for RH
            // const deltaY = computeDeltaY(temperature).toFixed(3);
            // const Kc = 1.3;
            // const e0 = computeE0(temperature).toFixed(3);
            // const ea = computesmallea(relativeHumidity, e0).toFixed(3);
            // const Ea = computeBigEa(e0, ea, wsMaxValue).toFixed(3);
            // const E = computeE(deltaY, gradValue, wsMaxValue, Ea).toFixed(3);
            // const I = computeI(E, Kc, areaSize).toFixed(3);
      
            // res.json({
            //   grad: gradValue,
            //   windSpeed1mm: ws1mmValue,
            //   maxWindSpeed: wsMaxValue,
            //   temperature: temperature,
            //   relativeHumidity: relativeHumidity,
            //   deltaY: deltaY,
            //   e0: e0,
            //   ea: ea,
            //   Ea: Ea,
            //   E: E,
            //   Kc: Kc,
            //   recommendation: I
            // });
      
            return;
          }

        }
      }

      const deltaY = computeDeltaY(temperature).toFixed(3);
      const Kc = userKc ? userKc : getKc().toFixed(3);
      const e0 = computeE0(temperature.toFixed(3));
      const ea = computesmallea(relativeHumidity, e0).toFixed(3);
      const Ea = computeBigEa(e0, ea, wsMaxValue).toFixed(3);
      const E = computeE(deltaY, gradValue, wsMaxValue, Ea).toFixed(3);
      const I = computeI(E, Kc, areaSize).toFixed(3);

      // Save or update data if the date is today
      if (dateToCheck.getTime() === currentDate.getTime()) {
        await dataService.saveOrUpdateData({
          stationName: selectedArea,
          gradient: gradValue,
          windSpeed1: ws1mmValue,
          maxWind: wsMaxValue,
          temp: temperature,
          relHumidity: relativeHumidity
        });
        console.log('Data saved/updated successfully.');
      } else {
        console.log("The date is not today, Data unsaved");
      }

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

    } else { //date is later then today
      console.log("The date is later than today.");
      selectedArea = String(selectedArea)
      const today = new Date();
      today.setDate(currentDate.getDate());
    
      lastBatch = await fetchDataFromStation(selectedArea, today);

      let gradValue = null, ws1mmValue = null, wsMaxValue = null, temperature = null, relativeHumidity = null;
      // Ashalim, Arad, Besor Farm, Dorot, Hazeva, Negba, Neot smadar, Shani, Yotvata
      if (['381', '29', '58', '79', '33', '82', '28', '36', '64', '65', '211', '349'].includes(selectedArea)) {
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
        } else if (selectedArea == '33') { // Hazeva
          nearbyStationId = '271'; // Avdat
        } else if (selectedArea == '349') { // Nevatim
          nearbyStationId = '60'; // Beer Sheva University
        }

        if (nearbyStationId) {
          try {
            const nearbyLastBatch = await fetchDataFromStation(nearbyStationId, today);

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

          }
        }
      }

      const input = [gradValue, relativeHumidity, temperature, ws1mmValue, wsMaxValue];
      const tensorInput = new ort.Tensor('float32', Float32Array.from(input), [1, input.length]);

      const predictions = {};
      for (const [key, modelPromise] of Object.entries(models)) {
        const model = await modelPromise;
        const output = await model.run({ float_input: tensorInput });

        // Assuming the output structure matches the previous format
        if (output && output.variable && output.variable.cpuData) {
          const predictionValues = Array.from(output.variable.cpuData);
          predictions[key] = predictionValues;
        } else {
          console.error(`No valid output received for model ${key}`);
          predictions[key] = null; // Handle case where prediction is not available
        }
      }
      const GradA = predictions["Grad1"][0];
      const RhA = predictions["Grad1"][1];
      const TempA = predictions["Grad1"][2];
      const MsA = predictions["Grad1"][3];
      const GsA = predictions["Grad1"][4];

      const deltaY_A = computeDeltaY(TempA).toFixed(3);
      const Kc_A = userKc ? userKc : getKc();;
      const e0_A = computeE0(TempA).toFixed(3);
      const ea_A = computesmallea(RhA, e0_A).toFixed(3);
      const Ea_A = computeBigEa(e0_A, ea_A, GsA).toFixed(3);
      const E_A = computeE(deltaY_A, GradA, GsA, Ea_A).toFixed(3);
      const I_A = computeI(E_A, Kc_A, areaSize).toFixed(3);

      const GradB = predictions["Grad2"][0].toFixed(3);
      const RhB = predictions["Grad2"][1].toFixed(3);
      const TempB = predictions["Grad2"][2].toFixed(3);
      const MsB = predictions["Grad2"][3].toFixed(3);
      const GsB = predictions["Grad2"][4].toFixed(3);

      // Compute values for Model B (Grad2)
      const deltaY_B = computeDeltaY(TempB).toFixed(3);
      const Kc_B = userKc ? userKc : getKc();;
      const e0_B = computeE0(TempB).toFixed(3);
      const ea_B = computesmallea(RhB, e0_B).toFixed(3);
      const Ea_B = computeBigEa(e0_B, ea_B, GsB).toFixed(3);
      const E_B = computeE(deltaY_B, GradB, GsB, Ea_B).toFixed(3);
      const I_B = computeI(E_B, Kc_B, areaSize).toFixed(3);

      const GradC = predictions["Grad3"][0];
      const RhC = predictions["Grad3"][1];
      const TempC = predictions["Grad3"][2];
      const MsC = predictions["Grad3"][3];
      const GsC = predictions["Grad3"][4];

      // Compute values for Model C (Grad3)
      const deltaY_C = computeDeltaY(TempC).toFixed(3);
      const Kc_C = userKc ? userKc : getKc().toFixed(3);;
      const e0_C = computeE0(TempC).toFixed(3);
      const ea_C = computesmallea(RhC, e0_C).toFixed(3);
      const Ea_C = computeBigEa(e0_C, ea_C, GsC).toFixed(3);
      const E_C = computeE(deltaY_C, GradC, GsC, Ea_C).toFixed(3);
      const I_C = computeI(E_C, Kc_C, areaSize).toFixed(3);

      const GradD = predictions["Grad4"][0].toFixed(3);
      const RhD = predictions["Grad4"][1].toFixed(3);
      const TempD = predictions["Grad4"][2].toFixed(3);
      const MsD = predictions["Grad4"][3].toFixed(3);
      const GsD = predictions["Grad4"][4].toFixed(3);

      // Compute values for Model D (Grad4)
      const deltaY_D = computeDeltaY(TempD).toFixed(3);
      const Kc_D = userKc ? userKc : getKc();;
      const e0_D = computeE0(TempD).toFixed(3);
      const ea_D = computesmallea(RhD, e0_D).toFixed(3);
      const Ea_D = computeBigEa(e0_D, ea_D, GsD).toFixed(3);
      const E_D = computeE(deltaY_D, GradD, GsD, Ea_D).toFixed(3);
      const I_D = computeI(E_D, Kc_D, areaSize).toFixed(3);

      let dayIdx = checkRelativeDate(date);

      // Prepare response object
      const responses = [
        {
          grad: GradA,
          relativeHumidity: RhA,
          temperature: TempA,
          windSpeed1mm: MsA,
          maxWindSpeed: GsA,
          deltaY: deltaY_A,
          Kc: Kc_A,
          e0: e0_A,
          ea: ea_A,
          Ea: Ea_A,
          E: E_A,
          recommendation: I_A
        },
        {
          grad: GradB,
          relativeHumidity: RhB,
          temperature: TempB,
          windSpeed1mm: MsB,
          maxWindSpeed: GsB,
          deltaY: deltaY_B,
          Kc: Kc_B,
          e0: e0_B,
          ea: ea_B,
          Ea: Ea_B,
          E: E_B,
          recommendation: I_B
        },
        {
          grad: GradC,
          relativeHumidity: RhC,
          temperature: TempC,
          windSpeed1mm: MsC,
          maxWindSpeed: GsC,
          deltaY: deltaY_C,
          Kc: Kc_C,
          e0: e0_C,
          ea: ea_C,
          Ea: Ea_C,
          E: E_C,
          recommendation: I_C
        },
        {
          grad: GradD,
          relativeHumidity: RhD,
          temperature: TempD,
          windSpeed1mm: MsD,
          maxWindSpeed: GsD,
          deltaY: deltaY_D,
          Kc: Kc_D,
          e0: e0_D,
          ea: ea_D,
          Ea: Ea_D,
          E: E_D,
          recommendation: I_D
        }
      ];

      // Return response object as JSON
      res.json(responses[dayIdx]);
    }
  } catch (error) {
    console.error('Error during calculation:', error);
  }
});


function checkRelativeDate(inputDateString) {
  // Parse the input date string into a Date object
  const inputDate = new Date(inputDateString);

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, and milliseconds to zero

  // Calculate target dates
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const threeDaysAfter = new Date(today);
  threeDaysAfter.setDate(today.getDate() + 3);

  const fourDaysAfter = new Date(today);
  fourDaysAfter.setDate(today.getDate() + 4);

  // Compare inputDate with each target date
  if (isSameDate(inputDate, tomorrow)) {
    return 0;
  } else if (isSameDate(inputDate, dayAfterTomorrow)) {
    return 1;
  } else if (isSameDate(inputDate, threeDaysAfter)) {
    return 2;
  } else if (isSameDate(inputDate, fourDaysAfter)) {
    return 3;
  } else {
    return 4;
  }
}

// Function to compare if two dates are the same day
function isSameDate(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}



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
    const userLatitude = req.body.latitude;
    const userLongitude = req.body.longitude;

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
            station,
            isPrediction,
        } = req.body.recommendation;

        const date = req.body.selectedDate

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
            station: station,
            isPrediction: isPrediction,
            date: date
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



// GET single recommendation by recommendationId
router.get('/recommendations/:recommendationId', async (req, res) => {
  try {
      const recommendationId = req.params.recommendationId;

      // Validate recommendationId format
      if (!mongoose.Types.ObjectId.isValid(recommendationId)) {
          return res.status(400).json({ error: 'Invalid recommendationId format' });
      }

      // Find recommendation by recommendationId
      const recommendation = await Recommendation.findById(recommendationId);

      // Check if recommendation exists
      if (!recommendation) {
          return res.status(404).json({ error: 'Recommendation not found' });
      }

      // Return the recommendation
      res.json(recommendation);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
  }
});

// Example route handler to save or update data
router.post('/saveOrUpdateData', async (req, res) => {
  const { stationName, gradient, windSpeed1, maxWind, temp, relHumidity } = req.body;

  try {
    await dataService.saveOrUpdateData({
      stationName,
      gradient,
      windSpeed1,
      maxWind,
      temp,
      relHumidity
    });

    res.status(200).json({ message: 'Data saved/updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;