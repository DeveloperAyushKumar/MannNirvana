import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmotionLineChart = ({ data }) => {
  // Convert timestamps to Date objects
  const chartData = data.map(item => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),  // Format timestamp to just time
    emotion: item.emotion,
    score: item.score
  }));

  // Custom Tooltip for showing emotion and score
  const CustomTooltip = ({ payload, label }) => {
    if (!payload || payload.length === 0) return null;

    const { emotion, score } = payload[0].payload;
    return (
      <div className="custom-tooltip" style={{ padding: "10px", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "5px" }}>
        <p><strong>Time: </strong>{label}</p>
        <p><strong>Emotion: </strong>{emotion}</p>
        <p><strong>Score: </strong>{score}</p>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EmotionLineChart;
