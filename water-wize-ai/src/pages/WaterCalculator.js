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

const locations = { //TODO: add to json file
  381: 'Ashalim',
  29: 'Arad',
  208: 'Ashkelon', // Adjusted from Ashqelon
  271: 'Avdat',
  60: 'Beer Sheva University', // Fixed typo: Uniersity to University
  58: 'Besor Farm',
  79: 'Dorot',
  64: 'Eilat', // Adjusted from Elat
  211: 'Ein Gedi', // Adjusted from En Gedi
  338: 'Ezuz',
  236: 'Gat',
  33: 'Hatzeva', // Adjusted from Hazeva
  350: 'Lahav',
  210: 'Metzoke Dragot',
  379: 'Mitzpe Ramon', // Adjusted from Mizpe
  82: 'Negba',
  232: 'Neot Smadar',
  349: 'Nevatim',
  207: 'Paran',
  98: 'Sde Boker', // Adjusted from Sede Boqer
  65: 'Sodom', // Adjusted from Sedom
  28: 'Shani',
  36: 'Yotvata',
  112: 'Zomet HaNegev' // Adjusted from Zomet Hanegev
};
const optionsAreas = Object.keys(locations).map(key => ({
  value: key,
  label: locations[key]
}));


const cities = { //TODO: add to json filr
  1: 'Tel Aviv',
  2: 'Beer Sheva',
  3: 'Jerusalm'
};
const optionsCities = Object.keys(cities).map(key => ({
  value: key,
  label: cities[key]
}));


function WaterCalculator() {
  const dict = useDictionary();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedAreaSize, setSelectedAreaSize] = useState(null);
  //const [waterRecommendation, setWaterRecommendation] = useState("");
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

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleAreaChange = (newArea) => {
    setSelectedArea(newArea);
  };

  const handleAreaSizeChange = (newSize) => {
    setSelectedAreaSize(newSize);
  };

  const calculate = async () => {
    try {
      if (selectedArea && selectedAreaSize) {
        // const calculationResponse = await fetch("api/calculate", {
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
        console.log(selectedArea.value )
        console.log(selectedAreaSize)
        const recommendationData = await calculationResponse.json();
        //setWaterRecommendation(recommendationData.recommendation);
        setDetailedData(recommendationData);
        console.log(recommendationData)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const findMyCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
      console.log("Geolocation is not supported by this browser."); // error handling
    }
  }

  const handleError = (error) => {
    // Handle different types of errors
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
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
  }


  const showPosition = (position) => {
    // const latitude = position.coords.latitude;
    // const longitude = position.coords.longitude;

    const wgs84Lat = 29.5526;
    const wgs84Long = 34.9520;

    // Convert WGS84 to ITM
    //const itmCoords = WGS84toITM(wgs84Lat, wgs84Long);
    //console.log(`WGS84 (${wgs84Lat}, ${wgs84Long}) to ITM: X: ${itmCoords.x}, Y: ${itmCoords.y}`);
  }

  return (
    <div className={classes.WaterCalculator}>
      <PageContainer>
        <TitleButton label={dict.waterCalculatorTitle}></TitleButton>
        <div className={classes.formControl}>
          <div className={classes.leftCol}>
            <ContainerBox width="10px">
              <InputPicker label={dict.city} value={selectedCity} onValueChange={setSelectedCity} options={optionsCities}/>
              <InputPicker label={dict.station} value={selectedArea} onValueChange={setSelectedArea} options={optionsAreas}/>
              <InputField label={dict.areaSize} value={selectedAreaSize} type="number" onValueChange={handleAreaSizeChange} checkIfValid={(x) => x === '' || (x < 5000 && x > 0)} error={dict.errorsAreaSizeRange} />

              <CustomButton onClick={calculate} label={dict.calculate} type="button" />
              <CustomButton onClick={calculate} label="Save Calculate" type="button" />
              <CustomButton onClick={calculate} label="Show all calcs" type="button" />
              <CustomButton onClick={findMyCoordinates} label="find my coordinates" type="button" />
            </ContainerBox>
          </div>
          <div className={classes.rightCol}>
            <DetailsPanel detailedData={detailedData} />
          </div>
        </div>
        <Recommendation recommendationDataRows={[detailedData]}/>
      </PageContainer >
    </div >
  );
}

export default WaterCalculator;
