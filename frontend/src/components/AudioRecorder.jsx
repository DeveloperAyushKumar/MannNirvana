import { useRef, useState, useEffect } from "react";

export default function App({ setQid }) {
  const BACKEND_URL = import.meta.env.VITE_RES_URL;
  const [transcript, setTranscript] = useState(""); 
  const [recognition, setRecognition] = useState(null);
  const isRecording = useRef(false);

  useEffect(() => {
    // Initialize SpeechRecognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognitionAPI();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        let finalTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
        setTranscript(finalTranscript);
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  const record = () => {
    if (recognition && !isRecording.current) {
      setTranscript(""); // Clear previous transcript
      recognition.start();
      isRecording.current = true;
    }
  };

  const stop = () => {
    if (recognition && isRecording.current) {
      recognition.stop();
      isRecording.current = false;
    }
  };

  const uploadTranscript = async () => {
    if (!transcript.trim()) {
      console.error("No transcript available for upload.");
      return;
    }

    const payload = {
      user_id: "6799288f3096d820266cbd6c",
      text: transcript,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/predict/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Transcript uploaded successfully:", result);
      } else {
        console.error("Failed to upload transcript:", response.statusText);
      }
    } catch (err) {
      console.error("Error uploading transcript:", err);
    }

    setTranscript("");
    setQid((prevQid) => prevQid + 1);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-between w-full">
        <button onClick={record} className="w-[30%] bg-yellow-400 text-black">Start Recording</button>
        <button onClick={stop} className="w-[30%] bg-yellow-400 text-black">Stop Recording</button>
        <button 
          onClick={uploadTranscript} 
          disabled={!transcript.trim()} 
          className={`w-[30%] bg-yellow-400 text-black ${!transcript.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Upload Answer
        </button>
      </div>
      
      {/* Display the live transcript */}
      <div className="w-full bg-gray-200 p-3 rounded-lg text-black">
        <h3 className="font-semibold">Live Transcript:</h3>
        <p>{transcript || "Start speaking..."}</p>
      </div>
    </div>
  );
}
