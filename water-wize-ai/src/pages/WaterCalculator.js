import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import classes from "../styles/WaterCalculator.module.css";
import DatePickerComponent from "../components/water-calculator/DatePickerComponent";
import CustomButton from "../components/CustomButton";
import DetailsPanel from "../components/water-calculator/DetailsPanel";
import useDictionary from "../resources/Dictionary/Dictionary";
import TitleButton from "../components/TitleButton";
import ContainerBox from "../components/ContainerBox";
import InputField from "../components/inputs/InputField";
import InputPicker from "../components/inputs/PickInput";
import AllUserRecommendations from "../components/AllUserRecommendations";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import { saveRecommendation, getLoggedInUserId, getCalculate } from "../apiRequests";
import CalculatorTabs from "../components/water-calculator/CalculatorTabs";
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';


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

function WaterCalculator() {
  const dict = useDictionary();

  const [openRecsModal, setOpenRecsModal] = React.useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAreaSize, setSelectedAreaSize] = useState(null);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [selectedKc, setSelectedKc] = useState(null);
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


  useEffect(() => {
    findMyCoordinates();
  }, []);


  const handleAreaChange = (newArea) => {
    setSelectedArea(newArea);
  };

  const handleKcChange = (newKc) => {
    setSelectedKc(newKc);

  };

  const handleAreaSizeChange = (newSize) => {
    setSelectedAreaSize(newSize);
  };

  const handleDateChange = (newDate) => {
    console.log(newDate)
    setSelectedDate(newDate);
  };

  const handleCityChange = (newCity) => {
    setSelectedCity({ label: newCity.label });
    const cityData = cityCoordinates[newCity.label];
    if (cityData) {
      const closestAreaName = cityData.closestArea;
      console.log(cityData);
      const closestAreaId = lopsidedlocations[closestAreaName];
      setSelectedArea({ value: closestAreaName, label: closestAreaName });
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

    //console.log(saveStatus) //TODO: handle error if needed
  }

  const calculate = async () => { 
    try {
      if (selectedArea && selectedAreaSize && selectedDate) {
        let area = lopsidedlocations[selectedArea.value] ? lopsidedlocations[selectedArea.value] : selectedArea.value
        let date = selectedDate.add(1, 'day')
        const recommendationData = await getCalculate(area, selectedAreaSize,  date);
        setDetailedData(recommendationData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const findMyCoordinates = async () => { //TODO: move to apiRequests
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;

          const response = await fetch('/calculator/coordinates', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude: userLatitude, longitude: userLongitude }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Received data:', data);

            // Extract closest area and city from the response
            const { closestArea, closestCity } = data;

            // Update the state with the closest area and city
            if (closestArea) {
              setSelectedArea({ value: closestArea.name, label: closestArea.name });
            }
            if (closestCity) {
              setSelectedCity({ label: closestCity });
            }

            console.log('Selected Area:', closestArea);
            console.log('Selected City:', closestCity);
          } else {
            console.error('Error fetching geolocation data:', response.statusText);
          }
        }, handleError);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



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
      default:
        break;
    }
  };

  const showPosition = (position) => {
    setLocationAllowed(true); // User allowed location access
  };

  return (
    <div className={classes.WaterCalculator}>
      <PageContainer>
        {/* <TitleButton label={dict.waterCalculatorTitle}></TitleButton> */}
        <TitleButton >{dict.waterCalculatorTitle}</TitleButton>
        <div className={classes.formControl}>
          <div className={classes.leftCol}>
            <ContainerBox width="500px">
              <InputPicker label={dict.city} value={selectedCity} onValueChange={handleCityChange} options={optionsCities} />
              <InputPicker label={dict.station} value={selectedArea} onValueChange={handleAreaChange} options={optionsAreas} />
              <DatePickerComponent
                onDateChange={handleDateChange}
                date={selectedDate}
              />
              <InputField label={dict.areaSize} value={selectedAreaSize} type="number" onValueChange={handleAreaSizeChange} checkIfValid={(x) => (x <= 100000 && x >= 10)} error={dict.errorsAreaSizeRange} />

              <CustomButton onClick={calculate} label={dict.calculate} type="button" />
              <CustomButton onClick={saveRec} label={dict.saveCalculate} type="button" secondary/>
              <CustomButton onClick={handleOpenRecsModal} label={dict.showAllCalcts} type="button" secondary/>
              {/* <CustomButton onClick={findMyCoordinates} label={dict.findMyCoordinates} type="button" />
              <CustomButton onClick={predict} label={dict.predict} type="button" /> */}
              {/* {!locationAllowed && (
                <p>
                  You can use the "Find My Coordinates" button if you change your mind and want to find your location later.
                </p>
              )} */}
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
        <div><CalculatorTabs
          formulaValues={
            <Box>
              <Box sx={{ marginLeft: "18%", fontWeight: "bold", fontSize: "30px", marginBottom: "40px" }}>
                You can edit the value of the variable Kc, if you want please enter your new value..
              </Box>
              <Box sx={{ marginLeft: "39%", width: "500px" }}>
                <InputField label={dict.KcValue} value={selectedKc} type="number" onValueChange={handleKcChange} checkIfValid={(x) => x === '' || (x <= 2 && x >= 0)} error={dict.errorsKcRange} />
              </Box>
            </Box>}

        /></div>
      </PageContainer >


    </div >

  );
}

export default WaterCalculator;
