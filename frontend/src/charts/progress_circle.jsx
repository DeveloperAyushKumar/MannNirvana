import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ProgressCircle = ({mental_state, confidence}) => {
  return (
    <div style={{ width: 200, height: 200 }}>
      <CircularProgressbar
        value={confidence}
        text={`${confidence}%`}
        styles={buildStyles({
          pathColor: confidence > 70 ? "#4caf50" : "#ff9800",  // Green for high percentages, Orange for low
          textColor: "#000000",
          trailColor: "#d6d6d6",
          textSize: "18px",
        })}
      />
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <strong>{mental_state}</strong>
      </div>
    </div>
  );
};

export default ProgressCircle;
