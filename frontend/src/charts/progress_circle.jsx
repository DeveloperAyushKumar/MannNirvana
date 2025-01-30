import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Sample data with mental state and percentage
const mentalStateData = {
  name: "Personality Disorder",
  percentage: 95,  // Change this value dynamically as needed
};

const ProgressCircle = () => {
  return (
    <div style={{ width: 200, height: 200 }}>
      <CircularProgressbar
        value={mentalStateData.percentage}
        text="Possibility"
        styles={buildStyles({
          pathColor: mentalStateData.percentage > 70 ? "#4caf50" : "#ff9800",  // Green for high percentages, Orange for low
          textColor: "#000000",
          trailColor: "#d6d6d6",
          textSize: "18px",
        })}
      />
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <strong>{mentalStateData.name}</strong>
      </div>
    </div>
  );
};

export default ProgressCircle;
