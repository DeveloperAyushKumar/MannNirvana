import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EmotionLineChart = ({data}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(()=>{
    if (!data || data.length === 0) return;
    console.log(data);
    setChartData(
      data.map(item => ({
        timestamp: new Date(item.created_at).toLocaleTimeString(),  
        emotion: item.emotions,
        score: item.score
      }))
    )
  }, [data]);

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
    <div className='w-full text-center'>
      <p className='text-xl font-bold'>Emotion Score Over Time</p>
      <ResponsiveContainer width="100%" height={400} className='mt-10'>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
          <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionLineChart;
