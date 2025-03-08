import { useEffect, useState } from "react";
import axios from "axios";
import ProgressCircle from "../charts/progress_circle";
import LineChart from "../charts/line_chart";
import suggestion from "../utils/suggestion";
import { useWalletContext } from "../context/WalletContext.jsx";

export default function Result() {
  const { user } = useWalletContext();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState([]);
  const [percentage, setPercentage] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  useEffect(() => {
    if(user) {
      axios
      .post(`${backendUrl}/chatbot/get-emotion`, { user_id: user?._id })
      .then((response) => {
        setData(response.data.emotions);

        const happyCount = response.data.emotions.filter(item => item.emotions === "Positive").length;
        const neutralCount = response.data.emotions.filter(item => item.emotions === "Neutral").length;
        const sadCount = response.data.emotions.filter(item => item.emotions === "Negative").length;
        
        setPercentage({
          positive: (happyCount / response.data.emotions.length) * 100,
          neutral: (neutralCount / response.data.emotions.length) * 100,
          negative: (sadCount / response.data.emotions.length) * 100
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }

  }, [user]);


  return (
    <div className="mt-16 flex flex-col justify-center items-center gap-16 max-w-screen">
      {/* Top Section - Progress Circle & Chart */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 w-full">
        <ProgressCircle mental_state={"Positive"} confidence={percentage.positive.toFixed(2)} />
        <ProgressCircle mental_state={"Neutral"} confidence={percentage.neutral.toFixed(2)} />
        <ProgressCircle mental_state={"Negative"} confidence={percentage.negative.toFixed(2)} />
        
        {/* Suggestions Section 
        {mental_state && (
          <div className="w-full p-6 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Suggestions for {mental_state}
            </h2>
            <div className="flex flex-col gap-4">
              {suggestion[mental_state]?.map((suggestion, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-100 shadow-md rounded-md transition-all duration-300 hover:bg-blue-50"
                >
                  <p className="text-gray-700 text-lg">{index + 1}. {suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>

      <div className="w-full">
        <LineChart data={data} />
      </div>
    </div>
  );
}
