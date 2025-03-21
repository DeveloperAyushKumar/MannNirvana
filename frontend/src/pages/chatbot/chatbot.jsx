import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useWalletContext } from '../../context/WalletContext';
import { FaMicrophone } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx"; 
import { BsSoundwave } from "react-icons/bs";
import { ClipLoader } from 'react-spinners';
import { FaPaperPlane } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "../../assets/animation";
import axios from 'axios';

const BackendURL = import.meta.env.VITE_BACKEND_URL;

const Bot = () => {
    const { user } = useWalletContext();
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([`mr-autoHello ${user?.name}! How can I help you?`]);
    const [transcript, setTranscript] = useState(""); 
    const [recognition, setRecognition] = useState(null);
    const isRecording = useRef(false);
    const [speech, setSpeech] = useState(false);
    const voiceChat = useRef(false);
    const timeoutRef = useRef(null);
    const indexRef = useRef(0);
    const lottieRef = useRef(null);

    const record = () => {
        if (recognition && !isRecording.current) {
            setTranscript(""); // Clear previous transcript
            setSpeech(true);
            recognition.start();
            isRecording.current = true;
        }
    };

    const stop = () => {
        if (recognition && isRecording.current) {
          recognition.stop();
          setSpeech(false);
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

    const playAnimation = (text = "Hello") => {
        const wordsPerSecond = 2.5; // Average speaking speed
        const wordCount = text.split(" ").length;
        const duration = (wordCount / wordsPerSecond) * 1000; // Duration in ms
    
        console.log(`Playing animation for ${duration} ms`);

        const animationDuration = 4000; // Assume Lottie animation duration in ms

        let repeatCount = Math.ceil(duration / animationDuration); // Calculate how many times to loop

        let count = 0;
        const loopAnimation = () => {
            if (count < repeatCount) {
                lottieRef.current?.goToAndPlay(0, true); // Restart animation
                count++;
                setTimeout(loopAnimation, animationDuration);
            } else {
                lottieRef.current?.stop(); // Stop after enough loops
            }
        };

        loopAnimation();
    };    

    const handleVoiceQuery = async (transcript) => {
        try {            
            const message = transcript.trim();
            console.log(message);

            if (!message) {
                console.log("Please enter a valid query");
                return;
            }

            if (!user) {
                console.log("Please login to chat with your dost");
                return;
            }

            setLoading(true);

            const res = await axios.post(`${BackendURL}/chatbot/generate-response/`, {
                text: message,
                user_id: user._id,
            });
            playAnimation(res.data.response.slice(14));
            speak(res.data.response.slice(14));
            indexRef.current += res.data.response.slice(14).length;
            return;
        } catch (error) {
            console.log("Error in fetching response");
            return;
        } finally {
            setLoading(false);
        }
    };    

    const speak = (text) => {
        return new Promise((resolve) => {
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.onend = () => {
            lottieRef.current?.stop();  // Stop animation when speech ends
            resolve(true);
         };
          synth.speak(utterance);
        });
    };

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
            for (let i = indexRef.current; i < event.results.length; i++) {
              finalTranscript += event.results[i][0].transcript + " ";
            }

            if(voiceChat.current){
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(()=>{
                    handleVoiceQuery(finalTranscript);
                    indexRef.current = event.results.length;
                }, 2000);
            }
            else{
                setTranscript(finalTranscript);
            }
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

            clearTimeout(timeoutRef.current);
            stop();
        }
    }, [voiceChat]);

    return (
        <div className="flex flex-col h-[85vh] items-center">
            <ToastContainer />

            {voiceChat.current? 
            <div className="w-full h-full flex flex-col">
                <div className='flex-2 h-[90vh] flex items-center justify-center'>
                    <Lottie
                        lottieRef={lottieRef} 
                        animationData={animationData}
                        loop={false}
                    />
                </div>

                <div className='flex-1 flex w-full gap-36 items-center justify-center'>
                    <div className='border p-4 rounded-full'>
                        {speech? 
                        <FaMicrophone size={32} className="text-white" onClick={stop} />
                        :
                        <FaMicrophoneSlash size={32} className="text-red-500 hover:text-red-600" onClick={record} />}
                    </div>

                    <div className='border p-4 rounded-full'>
                        <RxCross2 size={32} className="text-gray-500 hover:text-gray-600" onClick={()=>{
                            voiceChat.current = false;
                            indexRef.current = 0;
                            setTranscript("");
                            stop();
                        }} />
                    </div>
                </div>
            </div>
            :
            <div className="w-[90vw] h-full flex flex-col p-4">

                <div className="flex-1 overflow-y-auto p-4 rounded-lg" style={{ scrollbarWidth: "none" }} >
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
                        <BsSoundwave size={30} onClick={()=>{
                            let greet = `Hello ${user.name}, How can I help you?`;
                            voiceChat.current = true;
                            setSpeech(true);
                            speak(greet);
                            playAnimation(greet);
                            record();
                            indexRef.current+= greet.length;
                        }} /> 
                    )}
                </form>
            </div>}
        </div>
    );
};

export default Bot;