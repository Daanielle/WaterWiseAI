import React, { useState, useEffect } from 'react';
import PageContainer from "../components/PageContainer";

function WaterCalculator() {
  const [agriculturalData, setAgriculturalData] = useState({
    גודל_החלקה: '', // Size of Plot
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
    'Ashalim',
    'Arad',
    'Ashqelon Port',
    'Avdat',
    'Beer Sheva University',
    'Besor Farm',
    'Dorot',
    'Elat',
    'En Gedi',
    'Ezuz',
    'Gat',
    'Hazeva',
    'Lahav',
    'Metzoke Dragot',
    'Mizpe Ramon',
    'Negba',
    'Neot Smadar',
    'Nevatim',
    'Paran',
    'Sede Boqer',
    'Sedom',
    'Shani',
    'Yotvata',
    'Zomet Hanegev'
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
    setSelectedArea(e.target.value);
  };

  const handleClick = async () => {
    try {
      // Check if Size of Plot is provided
      if (!agriculturalData['גודל_החלקה']) {
        alert('Please enter the Size of Plot.');
        return;
      }

      // Check if Size of Plot is a valid number
      const sizeOfPlot = parseFloat(agriculturalData['גודל_החלקה']);
      if (isNaN(sizeOfPlot) || sizeOfPlot <= 0) {
        alert('Please enter a valid positive number for Size of Plot.');
        return;
      }

      // Send agricultural data to server for calculation
      const calculationResponse = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(agriculturalData)
      });
      const recommendationData = await calculationResponse.json();
      setWaterRecommendation(recommendationData.recommendation);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <PageContainer>
      <div>
        <h1>מחשבון מים</h1>
        <div>
          <label>גודל החלקה:</label> {/* Size of Plot */}
          <input type="text" name="גודל_החלקה" value={agriculturalData['גודל_החלקה']} onChange={handleChange} />
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
        <div>
          <label>Select Geographic Area:</label>
          <select value={selectedArea} onChange={handleAreaChange}>
            {areas.map((area, index) => (
              <option key={index} value={area}>{area}</option>
            ))}
          </select>
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
        <div>
          <h2>Date and Time in Israel:</h2>
          <p>{currentDateTime}</p>
        </div>
      </div>
    </PageContainer>
  );
}

export default WaterCalculator;
