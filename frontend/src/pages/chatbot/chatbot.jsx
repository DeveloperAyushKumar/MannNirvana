import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useWalletContext } from '../../context/WalletContext';
import { FaMicrophone } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx"; 
import { BsSoundwave } from "react-icons/bs";
import { ClipLoader } from 'react-spinners';
import { FaPaperPlane } from "react-icons/fa";
import axios from 'axios';

const BackendURL = import.meta.env.VITE_BACKEND_URL;

const Bot = () => {
    const { user } = useWalletContext();
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState(["mr-autoHello! How can I help you?"]);
    const [transcript, setTranscript] = useState(""); 
    const [recognition, setRecognition] = useState(null);
    const isRecording = useRef(false);
    const [speech, setSpeech] = useState(false);

    useEffect(() => {
        // Initialize SpeechRecognition
        let footer = document.querySelector("#footer");
        if(footer){
            footer.style.display = "none";
        }

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

        return () => {
            let footer = document.querySelector("#footer");
            if (footer) {
                footer.style.display = "block";
            }
        }
    }, []);

    const record = () => {
        if (recognition && !isRecording.current) {
            setTranscript(""); // Clear previous transcript
            setSpeech(!speech);
            recognition.start();
            isRecording.current = true;
        }
    };

    const stop = () => {
        if (recognition && isRecording.current) {
          recognition.stop();
          setSpeech(!speech);
          isRecording.current = false;
        }
    };

    const handleQuery = async (e) => {
        e.preventDefault();
        const message = e.target[0].value.trim();

        if (!message) {
            toast.error("Please enter a valid query");
            return;
        }

        if (!user) {
            toast.error("Please login to chat with your dost");
            return;
        }

        setChats((prevChats) => [...prevChats, "ml-auto" + message]);
        setTranscript("");
        setLoading(true);

        try {
            const res = await axios.post(`${BackendURL}/chatbot/generate-response/`, {
                text: message,
                user_id: user._id,
            });
            setChats((prevChats) => [...prevChats, "mr-auto" + res.data.response.slice(14)]);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error in fetching response");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[85vh] items-center">
            <ToastContainer />

            <div className="w-[90vw] h-full flex flex-col p-4">

                <div className="flex-1 overflow-y-auto p-4 rounded-lg">
                    {chats.map((chat, index) => (
                        <div
                            key={index}
                            className={`p-3 my-4 rounded-lg max-w-[75%] ${
                                chat.startsWith("ml-auto") ? "bg-gray-300 ml-auto" : "bg-gray-300"
                            }`}
                        >
                            {chat.slice(7)}
                        </div>
                    ))}
                </div>

                <form className="mt-4 flex items-center gap-2" onSubmit={handleQuery}>
                    {speech? 
                    <RxCross2 size={24} className="text-gray-600 hover:text-red-500" onClick={stop} />
                    :
                    <FaMicrophone size={24} className="text-white" onClick={record} />}

                    <input
                        type="text"
                        value = {transcript}
                        onChange = {(e) => setTranscript(e.target.value)}
                        placeholder="Write something..."
                        className="flex-1 p-3 rounded-lg bg-gray-200 text-white border-none"
                    />

                    {loading ? (
                        <span>
                            <ClipLoader color="black" size={24} />
                        </span>
                    ) : (
                        transcript ? 
                        <button className={`${
                            speech ? "cursor-not-allowed" : "cursor-pointer"
                        }`} disabled={speech}>
                            <FaPaperPlane size={24} />
                        </button>
                        : 
                        <BsSoundwave size={30} /> 
                    )}
                </form>
            </div>
        </div>
    );
};

export default Bot;