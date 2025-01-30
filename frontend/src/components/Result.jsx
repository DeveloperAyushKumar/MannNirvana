import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressCircle from "../charts/progress_circle";
import LineChart from "../charts/line_chart";

export default function Result(){
    const { user_id, mental_state, confidence } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL; 
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get(`${backendUrl}/face?user_id=${user_id}`)
        .then((response) => {
        setData(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
    }, [user_id]);

    return (
        <div className="mt-16 flex flex-col items-center gap-32">
            <ProgressCircle mental_state={mental_state} confidence={confidence} />
            <LineChart data={data} />
        </div>
    );
}