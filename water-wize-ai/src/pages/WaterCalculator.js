import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import classes from "../styles/WaterCalculator.module.css";
import DatePickerComponent from "../components/water-calculator/DatePickerComponent";
import AreaPicker from "../components/water-calculator/AreaPicker";
import { FormControl } from "@mui/material";
import AreaSizeInput from "../components/water-calculator/AreaSizeInput";
import CustomButton from "../components/CustomButton";

function WaterCalculator() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedAreaSize, setSelectedAreaSize] = useState(null);
  const [waterRecommendation, setWaterRecommendation] = useState('');
  const [detailedData, setDetailedData] = useState({});

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
      <h1>מחשבון מים</h1>
      <p>Selected Date: {selectedDate ? selectedDate.toString() : "None"}</p>
      <p>Selected Area: {selectedArea ? selectedArea.toString() : "None"}</p>
      <FormControl>
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
      </FormControl>
      
      {Object.keys(detailedData).length > 0 && (
        <div>
          <h2>Calculation Results</h2>
          <p>Grad: {detailedData.grad != null ? detailedData.grad.toString() : "N/A"}</p>
          <p>Wind Speed at 1mm: {detailedData.windSpeed1mm != null ? detailedData.windSpeed1mm.toString() : "N/A"}</p>
          <p>Maximum Wind Speed: {detailedData.maxWindSpeed != null ? detailedData.maxWindSpeed.toString() : "N/A"}</p>
          <p>Temperature: {detailedData.temperature != null ? detailedData.temperature.toString() : "N/A"}</p>
          <p>Relative Humidity: {detailedData.relativeHumidity != null ? detailedData.relativeHumidity.toString() : "N/A"}</p>
          <p>Delta Y: {detailedData.deltaY != null ? detailedData.deltaY.toString() : "N/A"}</p>
          <p>E0: {detailedData.e0 != null ? detailedData.e0.toString() : "N/A"}</p>
          <p>Ea: {detailedData.ea != null ? detailedData.ea.toString() : "N/A"}</p>
          <p>Ea: {detailedData.Ea != null ? detailedData.Ea.toString() : "N/A"}</p>
          <p>E: {detailedData.E != null ? detailedData.E.toString() : "N/A"}</p>
          <p>Kc: {detailedData.Kc != null ? detailedData.Kc.toString() : "N/A"}</p>
          <p>Recommendation: {detailedData.recommendation != null ? detailedData.recommendation.toString() : "N/A"}</p>
        </div>
      )}
    </PageContainer>
  );
}

export default WaterCalculator;
