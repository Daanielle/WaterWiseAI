import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import classes from "../styles/WaterCalculator.module.css";
import DatePickerComponent from "../components/water-calculator/DatePickerComponent";
import CustomButton from "../components/CustomButton";
import DetailsPanel from "../components/water-calculator/DetailsPanel";
import useDictionary from "../resources/Dictionary/Dictionary";
import ContainerBox from "../components/ContainerBox";
import InputField from "../components/inputs/InputField";
import InputPicker from "../components/inputs/PickInput";
import AllUserRecommendations from "../components/AllUserRecommendations";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import { saveRecommendation, getLoggedInUserId, getCalculate } from "../apiRequests";
import CalculatorTabs from "../components/water-calculator/CalculatorTabs";
import RecommendationDetails from "../components/water-calculator/RecommendationDetails";
import CustomSnackbar from "../components/CustomSnackbar";
import { getMyCoordinates } from "../apiRequests";

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

// const labels = [];

// for (const key in optionsCities) {
//   labels.push(optionsCities[key].label);
// }


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid var(--black-color)',
  boxShadow: 24,
  p: 4,
};

function WaterCalculator() {
  const dict = useDictionary();

  const [openRecsModal, setOpenRecsModal] = React.useState(false);
  const [saveRecSB, setSaveRecSB] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAreaSize, setSelectedAreaSize] = useState(null);
  const [selectedKc, setSelectedKc] = useState(null);
  const [userId, setUserId] = useState(null)
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
    const fetchData = async () => {
      await findMyCoordinates();
      const id = await getLoggedInUserId();
      setUserId(id);
    };

    fetchData();
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
    setSelectedDate(newDate);
  };

  const handleCityChange = (newCity) => {
    setSelectedCity({ label: newCity.label });
    const cityData = cityCoordinates[newCity.label];
    if (cityData) {
      const closestAreaName = cityData.closestArea;
      // const closestAreaId = lopsidedlocations[closestAreaName];
      setSelectedArea({ value: closestAreaName, label: closestAreaName });
    }
  };

  const handleOpenRecsModal = () => setOpenRecsModal(true);
  const handleCloseRecsModal = () => setOpenRecsModal(false);

  const handleOpenSnackbar = () => {
    setSaveRecSB(true);
  };

  const handleCloseSnackbar = () => {
    setSaveRecSB(false);
  };

  const saveRec = async () => {
    const station = selectedArea.value;
    let saveStatus = await saveRecommendation({
      userId,
      ...detailedData,
      station
    })

    if (saveStatus) {
      handleOpenSnackbar()
    }
  }

  const calculate = async () => {
    try {
      if (selectedArea && selectedAreaSize && selectedDate) {
        let area = lopsidedlocations[selectedArea.value] ? lopsidedlocations[selectedArea.value] : selectedArea.value
        let date = selectedDate.add(1, 'day')
        const recommendationData = await getCalculate(area, selectedAreaSize, date, selectedKc);
        setDetailedData(recommendationData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const findMyCoordinates = async () => { //TODO: move to apiRequests
    try {
      const fetchedCity = await getMyCoordinates();
      handleAreaChange(fetchedCity.selectedArea)
      handleCityChange(fetchedCity.closestCity)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveCalcDesign = {
    disabled: !userId || !selectedCity || !selectedArea || !selectedDate || !selectedAreaSize, 
    disabledTooltip: !userId ? "Log in in order to save a calculation" : "Make sure to fill all of the fields"
  };

  const calculateDesign = {
    disabled: !selectedCity || !selectedArea || !selectedDate || !selectedAreaSize, 
    disabledTooltip: "Make sure to fill all of the fields"
  };

  return (
    <div className={classes.WaterCalculator}>
      <PageContainer>
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

              <CustomButton onClick={calculate} label={dict.calculate} type="button" disabled={calculateDesign.disabled} disabledTooltip={calculateDesign.disabledTooltip}/>
              <CustomButton onClick={saveRec} label={dict.saveCalculate} type="button" secondary disabled={saveCalcDesign.disabled} disabledTooltip={saveCalcDesign.disabledTooltip} />
              <CustomButton onClick={handleOpenRecsModal} label={dict.showAllCalcts} type="button" secondary disabled={!userId} disabledTooltip={"Log in in order to show saved calculations"} />
            </ContainerBox>
            <RecommendationDetails detailedData={detailedData} />
          </div>
          <div className={classes.rightCol}>
            <DetailsPanel detailedData={detailedData} />
          </div>

        </div>
        <div><CalculatorTabs
          formulaValues={
            <Box>
              <Box sx={{ marginLeft: "18%", fontWeight: "bold", fontSize: "30px", marginBottom: "40px" }}>
                {dict.NewKc}
              </Box>
              <Box sx={{ marginLeft: "39%", width: "500px", height: "450px" }}>
                <InputField label={dict.KcValue} value={selectedKc} type="number" onValueChange={handleKcChange} checkIfValid={(x) => x === '' || (x <= 2 && x >= 0)} error={dict.errorsKcRange} />
              </Box>
            </Box>}
        /></div>

        <Modal
          open={openRecsModal}
          onClose={handleCloseRecsModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <AllUserRecommendations onRowClick={() => { }} />
          </Box>
        </Modal>
        <CustomSnackbar openSnackbar={saveRecSB} handleClose={handleCloseSnackbar} msg={"Reccomendation saved succesfully"} />
      </PageContainer >


    </div >

  );
}

export default WaterCalculator;
