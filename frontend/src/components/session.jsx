import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaMicrophone, FaStopwatch, FaArrowRight, FaVolumeUp, FaTimes, FaHome } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import AudioRecorder from "./AudioRecorder";
import WebStream from "./WebStream";

const InterviewMEET = (props) => {
  const { postID, typeID, InterviewID } = useParams();
  const [qid, setQid] = useState(0);
  const [questions, setQuestions] = useState([
    "How do you recognize when you're feeling mentally overwhelmed or stressed?",
    "What are some early signs that indicate you need to take a break from work?",
    "What strategies do you use to maintain a healthy work-life balance?",
    "Have you ever experienced burnout? If so, how did you overcome it?",
    "How do you manage conflicts or misunderstandings with colleagues in high-stress situations?",
    "What activities or habits help you recharge mentally and maintain emotional resilience?"
  ]);

  useEffect(() => {
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");

    const headerDisplay = header ? header.style.display : "";
    const footerDisplay = footer ? footer.style.display : "";

    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";

    return () => {
      if (header) header.style.display = headerDisplay;
      if (footer) footer.style.display = footerDisplay;
      window.location.reload();
    };
  }, []);

  const [time, setTime] = useState(300);
  const [ifStart, setIfStart] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speak = (text) => {
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => resolve(true);
      synth.speak(utterance);
    });
  };

  const [exitOption, setExitOption] = useState(false);
  const toggleExitOption = () => {
    setExitOption(!exitOption);
  };

  const backToHome = () => {
    window.speechSynthesis.cancel();
    window.location.href = "/";
  };

  return (
    <>
      <div className="w-full h-screen flex items-center">
        <ToastContainer />
        <button
          onClick={toggleExitOption}
          className="absolute top-3 left-3 z-10 font-extrabold border border-extraLight rounded-lg p-2 bg-light flex items-center gap-2 text-white"
        >
          <FaTimes /> EXIT
        </button>

        <div className="main-meet flex w-11/12 h-4/5 m-auto items-center justify-around">
          <div className="w-1/3 h-1/2 min-w-[640px] min-h-[480px] rounded-2xl bg-light text-black shadow-xl border-white border-2 flex flex-col p-4">
            <div>{ifStart ? questions[qid] : "Best of luck for the session!"}</div>
            <div className="mt-auto">
              <AudioRecorder setIfStart={setIfStart} ifStart={ifStart} setTime={setTime} />
            </div>
          </div>

          <div className="h-full flex flex-col justify-center items-center gap-16">
            <div className="w-60 h-40 bg-extraDark rounded-2xl text-white text-center flex flex-col">
              <div className="w-full h-[70%] bg-extraLight rounded-t-2xl flex items-center justify-center text-3xl">
                <FaStopwatch className="mr-2" />
                {ifStart ? `${Math.floor(time / 60)} Mins ${time % 60} Secs` : "Start Session"}
              </div>
              <div className="flex w-full h-[30%] justify-around rounded-b-2xl">
                <button
                  className={`h-full w-[49%] bg-Dark rounded-bl-2xl hover:bg-extraDark flex items-center justify-center gap-2 ${
                    isSpeaking || ifStart !== 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={async () => {
                    setIsSpeaking(true);
                    await speak(questions[qid]);
                    setIsSpeaking(false);
                  }}
                  disabled={isSpeaking || ifStart !== 1}
                >
                  <FaVolumeUp /> Speak
                </button>
                <button
                  className={`rounded-br-2xl h-full w-[49%] bg-extraDark  flex items-center justify-center gap-2 ${
                    isSpeaking || ifStart !== 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSpeaking || ifStart !== 1}
                  onClick={() => setQid((prev) => prev + 1)}
                >
                  <FaArrowRight /> Next
                </button>
              </div>
            </div>

            <div className="w-80 h-fit bg-dark rounded-lg border-white border-3 text-red-400 font-semibold">
              <WebStream />
            </div>
          </div>
        </div>
      </div>

      {exitOption && (
        <div className="w-full h-full backdrop-blur-lg absolute top-0 bg-[rgba(23, 23, 23, 0.44)] flex items-center justify-center">
          <div className="w-[300px] h-28 flex flex-col items-center justify-around">
            <div className="w-full h-[77px] bg-light rounded-t-2xl p-2 text-center">
              Do you want to quit the assessment?
            </div>
            <div className="flex w-full h-[33px] justify-around rounded-b-2xl">
              <button
                className="h-full w-[149px] bg-dark rounded-bl-2xl "
                onClick={toggleExitOption}
              >
                No
              </button>
              <button
                className="rounded-br-2xl h-full w-[149px] bg-dark flex items-center justify-center gap-2 text-white"
                onClick={backToHome}
              >
                <FaHome /> Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InterviewMEET;
