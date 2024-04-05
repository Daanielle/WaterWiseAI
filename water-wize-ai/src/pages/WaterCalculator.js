import React, { useState, useEffect } from 'react';
import PageContainer from "../components/PageContainer";
import classes from "../styles/WaterCalculator.module.css";

function WaterCalculator() {
  const [agriculturalData, setAgriculturalData] = useState({
    data1: '', // Size of Plot
    data2: '',
    data3: '',
    data4: '',
    data5: ''
  });
  const [weatherData, setWeatherData] = useState({});
  const [waterRecommendation, setWaterRecommendation] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [areas, setAreas] = useState([
    { name: 'Ashalim', number: 74 },
    { name: 'Arad', number: 70 },
    { name: 'Ashqelon Port', number: 61 },
    { name: 'Avdat', number: 77 },
    { name: 'Beer Sheva University', number: 69 },
    { name: 'Besor Farm', number: 68 },
    { name: 'Dorot', number: 64 },
    { name: 'Elat', number: 83 },
    { name: 'En Gedi', number: 65 },
    { name: 'Ezuz', number: 76 },
    { name: 'Gat', number: 62 },
    { name: 'Hazeva', number: 78 },
    { name: 'Lahav', number: 66 },
    { name: 'Metzoke Dragot', number: 63 },
    { name: 'Mizpe Ramon', number: 79 },
    { name: 'Negba', number: 60 },
    { name: 'Neot Smadar', number: 81 },
    { name: 'Nevatim', number: 71 },
    { name: 'Paran', number: 80 },
    { name: 'Sede Boqer', number: 75 },
    { name: 'Sedom', number: 73 },
    { name: 'Shani', number: 67 },
    { name: 'Yotvata', number: 82 },
    { name: 'Zomet Hanegev', number: 72 }
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toLocaleString('en-IL', { timeZone: 'Asia/Jerusalem' });
      setCurrentDateTime(currentTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgriculturalData({ ...agriculturalData, [name]: value });
  };

  const handleAreaChange = (e) => {
    const selectedNumber = parseInt(e.target.value);
    setSelectedArea(selectedNumber);
  };

  const handleClick = async () => {
    try {
      // Check if Size of Plot is provided
      if (!agriculturalData['data1']) {
        alert('Please enter the Size of Plot.');
        return;
      }
  
      // Check if Size of Plot is a valid number
      const sizeOfPlot = parseFloat(agriculturalData['data1']);
      if (isNaN(sizeOfPlot) || sizeOfPlot <= 0) {
        alert('Please enter a valid positive number for Size of Plot.');
        return;
      }
  
      // Check if selectedArea is provided
      if (!selectedArea) {
        alert('Please select a geographic area.');
        return;
      }
  
      // Send agricultural data and selected area to server for calculation
      const calculationResponse = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...agriculturalData,
          selectedArea: selectedArea // Include selectedArea in the request payload
        })
      });
  
      const recommendationData = await calculationResponse.json();
      setWaterRecommendation(recommendationData.recommendation);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className={classes.WaterCalculator}>
      <h1 className={classes.h1}>מחשבון מים</h1>
      <div className={classes.Inser_data}>
        <label>data1:</label> {/* Size of Plot */}
        <input type="text" name="data1" value={agriculturalData['data1']} onChange={handleChange} />
      </div>
      <div className={classes.Inser_data}>
        <label>Data 2:</label>
        <input type="text" name="data2" value={agriculturalData.data2} onChange={handleChange} />
      </div>
      <div className={classes.Inser_data}>
        <label>Data 3:</label>
        <input type="text" name="data3" value={agriculturalData.data3} onChange={handleChange} />
      </div>
      <div className={classes.Inser_data}>
        <label>Data 4:</label>
        <input type="text" name="data4" value={agriculturalData.data4} onChange={handleChange} />
      </div>
      <div className={classes.Inser_data}>
        <label>Data 5:</label>
        <input type="text" name="data5" value={agriculturalData.data5} onChange={handleChange} />
      </div>
      <div className={classes.Inser_data}>
        <label>Select Geographic Area:</label>
        <select value={selectedArea} onChange={handleAreaChange}>
          {areas.map((area, index) => (
            <option key={index} value={area.number}>{area.name}</option>
          ))}
        </select>
      </div >
      <button className={classes.Calculate_Button} onClick={handleClick}>Calculate</button>
      <div className={classes.Our_Data}>
        <h2>Weather Data:</h2>
        <pre>{JSON.stringify(weatherData, null, 2)}</pre>
      </div>
      <div className={classes.Recommendation}>
        <h2>Water Recommendation:</h2>
        {waterRecommendation ? (
        <p>{waterRecommendation}</p>
        ) : (
        <p>No water recommendation available</p> )}
      </div>
      <div className={classes.Our_Data}>
        <h2>Date and Time in Israel:</h2>
        <p>{currentDateTime}</p>
      </div>
    </div>
  );
}

export default WaterCalculator;
