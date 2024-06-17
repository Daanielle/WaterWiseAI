import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import classes from "../styles/WaterCalculator.module.css";
import DatePickerComponent from "../components/water-calculator/DatePickerComponent";
import AreaPicker from "../components/water-calculator/AreaPicker";
import CustomButton from "../components/CustomButton";
import DetailsPanel from "../components/water-calculator/DetailsPanel";
import useDictionary from "../resources/Dictionary/Dictionary";
import TitleButton from "../components/TitleButton";
import ContainerBox from "../components/ContainerBox";
import InputField from "../components/inputs/InputField";
import InputPicker from "../components/inputs/PickInput";
import Recommendation from "../components/recommendation/Recomendation"; //TODO: remove after creating user recs page
import { saveRecommendation, getLoggedInUserId } from "../apiRequests";
import AllUserRecommendations from "../components/AllUserRecommendations";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";

const bycodejson = require('../resources/bycode2022Updated.json');

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
}

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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: /,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function WaterCalculator() {
  const dict = useDictionary();

  const [openRecsModal, setOpenRecsModal] = React.useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedAreaSize, setSelectedAreaSize] = useState(null);
  const [detailedData, setDetailedData] = useState({
    grad: "--",
    windSpeed1mm: "--",
    maxWindSpeed: "--",
    temperature: "--",
    relativeHumidity: "--",
    deltaY: "--",
    e0: "--",
    ea: "--",
    Ea: "--",
    E: "--",
    Kc: "--",
    recommendation: "--",
  });

  const handleAreaChange = (newArea) => {
    setSelectedArea(newArea);
  };

  const handleAreaSizeChange = (newSize) => {
    setSelectedAreaSize(newSize);
  };

  const handleCityChange = (newCity) => {
    setSelectedCity(newCity);
    const cityData = cityCoordinates[newCity.label];
    if (cityData) {
      const closestAreaName = cityData.closestArea;
      console.log(cityData);
      const closestAreaId = lopsidedlocations[closestAreaName];
      setSelectedArea({ value: closestAreaId, label: closestAreaName });
    }
  };

  const handleOpenRecsModal = () => setOpenRecsModal(true);
  const handleCloseRecsModal = () => setOpenRecsModal(false);


  const saveRec = async () => {
const station = selectedArea.value;
    const userId = await getLoggedInUserId();
    let saveStatus = saveRecommendation({
      userId,
      ...detailedData,
      station
    })
  }

  const calculate = async () => {
    try {
      if (selectedArea && selectedAreaSize) {
        const calculationResponse = await fetch('/calculator/calculate', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedArea: selectedArea.value,
            areaSize: selectedAreaSize,
          }),
        });
        const recommendationData = await calculationResponse.json();
        setDetailedData(recommendationData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const findMyCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const handleError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        setLocationAllowed(false);
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  };

  const showPosition = (position) => {
    setLocationAllowed(true); // User allowed location access
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;

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

    let closestArea = null;
    let minDistanceArea = Infinity;

    for (const areaId in areaCoordinates) {
      const area = areaCoordinates[areaId];
      const areaLatitude = area.latitude;
      const areaLongitude = area.longitude;
      const dist = calculateDistance(
        userLatitude,
        userLongitude,
        areaLatitude,
        areaLongitude
      );
      if (dist < minDistanceArea) {
        minDistanceArea = dist;
        closestArea = area;
      }
    }

    if (closestArea) {
      setSelectedArea({ value: closestArea.name, label: closestArea.name });
    }

    let closestCity = null;
    let minDistanceCity = Infinity;

    for (const cityName in cityCoordinates) {
      const city = cityCoordinates[cityName];
      const cityLatitude = city.latitude;
      const cityLongitude = city.longitude;
      const dist = calculateDistance(
        userLatitude,
        userLongitude,
        cityLatitude,
        cityLongitude
      );
      if (dist < minDistanceCity) {
        minDistanceCity = dist;
        closestCity = cityName;
      }
    }

    if (closestCity) {
      const cityValue = optionsCities.find(option => option.label === closestCity).value;
      setSelectedCity({ value: cityValue, label: closestCity });
    }
  };

const [locationAllowed, setLocationAllowed] = useState(false);

useEffect(() => {
  findMyCoordinates();
}, []);


  return (
    <div className={classes.WaterCalculator}>
      <PageContainer>
        <TitleButton label={dict.waterCalculatorTitle}></TitleButton>
        <div className={classes.formControl}>
          <div className={classes.leftCol}>
            <ContainerBox width="10px">
              <InputPicker label={dict.city} value={selectedCity} onValueChange={handleCityChange} options={optionsCities} />
              <InputPicker label={dict.station} value={selectedArea} onValueChange={handleAreaChange} options={optionsAreas} />
              <InputField label={dict.areaSize} value={selectedAreaSize} type="number" onValueChange={handleAreaSizeChange} checkIfValid={(x) => x === '' || (x < 5000 && x > 0)} error={dict.errorsAreaSizeRange} />

              <CustomButton onClick={calculate} label={dict.calculate} type="button" />
              <CustomButton onClick={saveRec} label="Save Calculate" type="button" />
              {/* TODO: disable Save Calculate when no calc or not logged in */}
              <CustomButton onClick={handleOpenRecsModal} label="Show all calcs" type="button" />
              <CustomButton onClick={findMyCoordinates} label="find my coordinates" type="button" />
              {!locationAllowed && (
              <p>
                You can use the "Find My Coordinates" button if you change your mind and want to find your location later.
              </p>
            )}
            </ContainerBox>
          </div>
          <div className={classes.rightCol}>
            <DetailsPanel detailedData={detailedData} />
          </div>
        </div>
        <Modal
          open={openRecsModal}
          onClose={handleCloseRecsModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <AllUserRecommendations />
          </Box>
        </Modal>
      </PageContainer >
    </div >
  );
}

export default WaterCalculator;
