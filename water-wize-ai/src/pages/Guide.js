import React, { useState } from 'react';
import PageContainer from "../components/PageContainer";
import "../styles/Guide.css"; // Import the CSS file for styling

function Guide() {
  const [currentExplanation, setCurrentExplanation] = useState('');

  const handleButtonClick = (explanation) => {
    setCurrentExplanation(explanation);
  };

  return (
    <PageContainer>
      <h1>תמיכה והדרכה</h1>
      <div className="guide-buttons">
        {/* First three buttons */}
        <button className="guide-button" onClick={() => handleButtonClick('Explanation for Screen 1')}>
          Explanation for Screen 1
        </button>
        <button className="guide-button" onClick={() => handleButtonClick('Explanation for Screen 2')}>
          Explanation for Screen 2
        </button>
        <button className="guide-button" onClick={() => handleButtonClick('Explanation for Screen 3')}>
          Explanation for Screen 3
        </button>
        {/* Additional three buttons */}
        <button className="guide-button" onClick={() => handleButtonClick('Explanation for Screen 4')}>
          Explanation for Screen 4
        </button>
        <button className="guide-button" onClick={() => handleButtonClick('Explanation for Screen 5')}>
          Explanation for Screen 5
        </button>
        <button className="guide-button" onClick={() => handleButtonClick('Explanation for Screen 6')}>
          Explanation for Screen 6
        </button>
      </div>
      {currentExplanation && (
        <div className="explanation">
          <h2>הסבר</h2>
          <p>{currentExplanation}</p>
        </div>
      )}
    </PageContainer>
  );
}

export default Guide;
