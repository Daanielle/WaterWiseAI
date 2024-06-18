// locationsData.js

const bycodejson = require('C:\\Users\\user\\Desktop\\WaterWiseAI\\water-wize-ai\\src\\resources\\bycode2022Updated.json');

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
};

const optionsAreas = Object.keys(locations).map(key => ({
  value: key,
  label: locations[key]
}));

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

export { cityCoordinates, areaCoordinates, locations, lopsidedlocations, optionsAreas, optionsCities, labels };
