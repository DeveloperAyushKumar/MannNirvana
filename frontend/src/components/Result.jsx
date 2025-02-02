import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProgressCircle from "../charts/progress_circle";
import LineChart from "../charts/line_chart";
import suggestion from "../utils/suggestion";

export default function Result() {
  const { user_id, mental_state, confidence } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/face?user_id=${user_id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  return (
    <div className="mt-16 flex flex-col items-center max-w-screen-lg mx-auto gap-16">
      {/* Top Section - Progress Circle & Chart */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 w-full">
        <ProgressCircle mental_state={mental_state} confidence={confidence} />
        
        {/* Suggestions Section */}
        {mental_state && (
          <div className="w-full p-6 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Suggestions for {mental_state}
            </h2>
            <div className="flex flex-col gap-4">
              {suggestion[mental_state].map((suggestion, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-100 shadow-md rounded-md transition-all duration-300 hover:bg-blue-50"
                >
                  <p className="text-gray-700 text-lg">{index + 1}. {suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full bg-white p-6 rounded-lg shadow-lg">
        <LineChart data={data} />
      </div>
    </div>
  );
}
