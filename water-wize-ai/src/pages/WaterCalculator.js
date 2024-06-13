import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import classes from "../styles/WaterCalculator.module.css";
import DatePickerComponent from "../components/water-calculator/DatePickerComponent";
import AreaPicker from "../components/water-calculator/AreaPicker";
import AreaSizeInput from "../components/water-calculator/AreaSizeInput";
import CustomButton from "../components/CustomButton";
import DetailsPanel from "../components/water-calculator/DetailsPanel";
import useDictionary from "../resources/Dictionary/Dictionary";
import TitleButton from "../components/TitleButton"
// import {ITMtoWGS84, WGS84toITM} from "../geo";

function WaterCalculator() {
  const dict = useDictionary();

  const [selectedDate, setSelectedDate] = useState(null);
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
            selectedArea: selectedArea,
            areaSize: selectedAreaSize,
          }),
        });

        const recommendationData = await calculationResponse.json();
        //setWaterRecommendation(recommendationData.recommendation);
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
            <AreaPicker onAreaChange={handleAreaChange} area={selectedArea} />
            <DatePickerComponent
              onDateChange={handleDateChange}
              date={selectedDate}
            />
            <AreaSizeInput
              onAreaSizeChange={handleAreaSizeChange}
              areaSize={selectedAreaSize}
            />

            <CustomButton onClick={calculate} label={dict.calculate} type="button" />
            <CustomButton onClick={findMyCoordinates} label="find my coordinates" type="button" />
          </div>
          <div className={classes.rightCol}>
            <DetailsPanel detailedData={detailedData} />
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default WaterCalculator;
