import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import classes from "../styles/WaterCalculator.module.css";
import DatePickerComponent from "../components/water-calculator/DatePickerComponent";
import AreaPicker from "../components/water-calculator/AreaPicker";
import { FormControl } from "@mui/material";
import AreaSizeInput from "../components/water-calculator/AreaSizeInput";
import CustomButton from "../components/CustomButton";
import DetailCard from "../components/water-calculator/DetailCard";
import DetailsPanel from "../components/water-calculator/DetailsPanel";

function WaterCalculator() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedAreaSize, setSelectedAreaSize] = useState(null);
  const [waterRecommendation, setWaterRecommendation] = useState("");
  const [detailedData, setDetailedData] = useState({
    grad: '--',
    windSpeed1mm: '--',
    maxWindSpeed: '--',
    temperature: '--',
    relativeHumidity: '--',
    deltaY: '--',
    e0: '--',
    ea: '--',
    Ea: '--',
    E: '--',
    Kc: '--',
    recommendation: '--'
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
      const calculationResponse = await fetch("/api/calculate", {
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
      setWaterRecommendation(recommendationData.recommendation);
      setDetailedData(recommendationData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <PageContainer>
      <h1>Water Calculator</h1>
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

          <CustomButton onClick={calculate} label="Calculate" type="button" />
        </div>
        <div className={classes.rightCol}>
          <DetailsPanel detailedData={detailedData} />
        </div>
      </div>

    </PageContainer>
  );
}

export default WaterCalculator;
