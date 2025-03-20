import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EmotionLineChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const formattedData = data.map(item => ({
      timestamp: new Date(item.created_at).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }),  
      date: new Date(item.created_at).toISOString().split("T")[0], // Extract YYYY-MM-DD
      time: new Date(item.created_at).toLocaleTimeString(), // Extract HH:MM:SS
      emotion: item.emotions || "Unknown",
      score: item.score ?? 0 // Ensure score is not null
    }));

    setChartData(formattedData);
  }, [data]);

  // Custom Tooltip to show emotion & score
  const CustomTooltip = ({ payload, label }) => {
    if (!payload || payload.length === 0) return null;
    const { emotion, score } = payload[0].payload;

    return (
      <div style={{ padding: "10px", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "5px" }}>
        <p><strong>Time:</strong> {label}</p>
        <p><strong>Emotion:</strong> {emotion}</p>
        <p><strong>Score:</strong> {score}</p>
      </div>
    );
  };

  return (
    <div className="w-full text-center">
      <ResponsiveContainer width="100%" height={400} className="mt-10">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis domain={[-1, 1]} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="basis" dataKey="score" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xl font-bold mb-8">Emotion Trend</p>
    </div>
  );
};

export default EmotionLineChart;
