import {useRef, useState} from "react";
import { downloadWav, getWaveBlob } from "webm-to-wav-converter";


export default function App({ setQid }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const mediaRecorder = useRef(null);
  const stream = useRef(null);
  const [audioBlob, setAudioBlob] = useState(null);

  const record = async () => {
    if (!(mediaRecorder.current && stream.current)) {
      const constraints = { audio: true, video: false };

      try {
        stream.current = await navigator.mediaDevices.getUserMedia(constraints);

        mediaRecorder.current = new MediaRecorder(stream.current);

        mediaRecorder.current.ondataavailable = async(e) => {
          if (mediaRecorder.current) {
    
            const wavBlob = await getWaveBlob(e.data, false); // Should return a valid Blob

            if (!(wavBlob instanceof Blob)) {
                console.error("getWaveBlob did not return a valid Blob");
            }
            
            setAudioBlob(wavBlob);
          }
        };
      } catch (err) {
        console.error(err);
      }
    }
    mediaRecorder.current.start();
  };

  const stop = () => {
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const tracks = stream.current.getTracks();
      tracks.forEach((track) => track.stop());
      stream.current = null;
      mediaRecorder.current = null;
    };
  };
  const end = () => {
    // const tracks = stream.current.getTracks();
    // tracks.forEach((track) => track.stop());
  };

  const uploadAudio = async () => {
    if (!audioBlob) {
      console.error("No audio blob available for upload.");
      return;
    }

    const formData = new FormData();
    console.log("audioBlob", audioBlob);
    formData.append("file", audioBlob, "recording.wave");
    formData.append("interview_id", "6772a648652fdff0a3c339ba");
    formData.append("question_id", "6772a574a19e5eedb1d94ebe");
    formData.append("user_id", "6772a6cd9f17be85486b1f81");
    formData.append("company_id", "6772a6cd9f17be85486b1f81");

    try {
      const response = await fetch(`${BACKEND_URL}/ans/analyse-results/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Audio uploaded successfully:", result);
      } else {
        console.error("Failed to upload audio:", response.statusText);
      }
    } catch (err) {
      console.error("Error uploading audio:", err);
    }

    setAudioBlob(null);
    setQid((prevQid) => prevQid + 1);
  };

  return (
    <div className="flex justify-between items-center flex-wrap">
      <button onClick={record} className="w-[30%] bg-yellow-400 text-black">Start Recording</button>
      <button onClick={stop} className="w-[30%] bg-yellow-400 text-black">Stop Recording</button>
      <button onClick={uploadAudio} disabled={!audioBlob} className={`w-[30%] bg-yellow-400 text-black ${!audioBlob ? "opacity-50 cursor-not-allowed" : ""}`}>
        Upload Answer
      </button>
    </div>
  );
}
