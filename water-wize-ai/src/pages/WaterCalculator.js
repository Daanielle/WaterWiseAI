import React, { useState } from 'react';
import PageContainer from "../components/PageContainer";

function WaterCalculator() {
  const [agriculturalData, setAgriculturalData] = useState({
    data1: '',
    data2: '',
    data3: '',
    data4: '',
    data5: ''
  });
  const [weatherData, setWeatherData] = useState({});
  const [waterRecommendation, setWaterRecommendation] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgriculturalData({ ...agriculturalData, [name]: value });
  };

  const handleClick = async () => {
    try {
      // Fetch weather data from Express backend
      const weatherResponse = await fetch('/api/weather');
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);

      // Send agricultural data to server for calculation
      const calculationResponse = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(agriculturalData)
      });
      const recommendation = await calculationResponse.json();
      setWaterRecommendation(recommendation);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <PageContainer>
      <div>
        <h1>מחשבון מים</h1>
        <div>
          <label>Data 1:</label>
          <input type="text" name="data1" value={agriculturalData.data1} onChange={handleChange} />
        </div>
        <div>
          <label>Data 2:</label>
          <input type="text" name="data2" value={agriculturalData.data2} onChange={handleChange} />
        </div>
        <div>
          <label>Data 3:</label>
          <input type="text" name="data3" value={agriculturalData.data3} onChange={handleChange} />
        </div>
        <div>
          <label>Data 4:</label>
          <input type="text" name="data4" value={agriculturalData.data4} onChange={handleChange} />
        </div>
        <div>
          <label>Data 5:</label>
          <input type="text" name="data5" value={agriculturalData.data5} onChange={handleChange} />
        </div>
        <button onClick={handleClick}>Calculate</button>
        <div>
          <h2>Weather Data:</h2>
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
        <div>
          <h2>Water Recommendation:</h2>
          <p>{waterRecommendation}</p>
        </div>
      </div>
    </PageContainer>
  );
}

export default WaterCalculator;
