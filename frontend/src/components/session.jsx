import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import AudioStream from "./AudioRecorder";
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

  const [time, setTime] = useState(10);
  const [ifStart, setIfStart] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  let timingInterval;

  const speak = (text) => {
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => resolve(true);
      synth.speak(utterance);
    });
  };

  //todo Toggle Exit options from where
  const [exitOption, setExitOption] = useState(false);
  const Confirmation = document.getElementById("exits-options");

  const toggleExitOption = () => {
    setExitOption(!exitOption);
    if (Confirmation)
      Confirmation.style.display = exitOption === true ? "flex" : "none";
  };

  const backToHome = () => {
    console.log("Back to Home");
    clearInterval(timingInterval);
    window.speechSynthesis.cancel();
    window.location.href = "/";
  };

  const startInterview = () => {
    setIfStart(1);
    timingInterval = setInterval(()=>{
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timingInterval); 
          setIfStart(2);
          return 0; 
        }
        return prev - 1;
      });

    }, 1000);
  };


  return (
    <>
      <div className="w-full h-screen bg-slate-950 p-0 z-9 flex items-center">
        {/* EXIT */}

        <button
          onClick={toggleExitOption}
          className="text-white text-lg absolute top-3 left-3 z-10 font-extrabold"
        >
          EXIT
        </button>
        {/* Main meet */}
        <div className="main-meet flex w-11/12 h-4/5 m-auto items-center px-auto justify-around">
        <div className="w-1/3 h-1/2 min-w-[640px] min-h-[480px] rounded-2xl bg-indigo-950 text-slate-50 hover:shadow-[55px_-43px_120px_rgba(112,0,255,0.25),-74px_39px_120px_rgba(204,0,255,0.25)] border-white border-8 flex flex-col p-4">
          <div>{ifStart ? questions[qid] : "Best of luck for the interview!"}</div>
          {ifStart === 1? <div className="mt-auto"><AudioStream setQid={setQid} /></div>
           : 
          ifStart === 2? <button className="mt-auto bg-yellow-400 text-black rounded-2xl p-2 hover:bg-slate-600">Show Results</button> 
          : 
          <></>}
        </div>

          <div
            id="RIGHT-SIDE-OPTIONS"
            className="h-full flex flex-col justify-center items-center gap-16"
          >

            {/* time and command component */}
            <div className="w-60 h-40 bg-slate-600 rounded-2xl ">
              <div className="w-full h-[70%] bg-red-400 rounded-t-2xl justify-center text-3xl flex items-center" onClick={questions.length? startInterview: ()=>{}}>
                {ifStart? `${Math.floor(time/60)} Mins ${time%60} Secs` : questions.length? "Start Interview" : "Loading Questions"}
              </div>
              <div className="flex w-full h-[30%] justify-around rounded-b-2xl">
                <button
                  className={`h-full w-[49%] bg-slate-400 rounded-bl-2xl hover:bg-slate-600 ${(isSpeaking || (ifStart != 1)) ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={async () => {
                    setIsSpeaking(true);
                    await speak(questions[qid]);
                    setIsSpeaking(false);
                  }}

                  disabled={isSpeaking || (ifStart != 1)}
                >
                  Speak
                </button>
                <button className="rounded-br-2xl h-full w-[49%] bg-slate-400 hover:bg-slate-600">
                  Next
                </button>
              </div>
            </div>

            {/* OUR_CAMERA */}
            <div className=" w-80 h-fit bg-slate-500 rounded-lg border-white border-3 text-wrap text-red-400 font-semibold">
              <WebStream />
            </div>
          </div>
        </div>
      </div>

      <div
        id="exits-options"
        className="w-full h-full backdrop-blur-lg absolute top-0 bg-[rgba(23, 23, 23, 0.44)] items-center justify-center hidden"
      >
        <button
          onClick={toggleExitOption}
          className="text-white text-lg absolute top-3 left-3"
        >
          <img src="" />
        </button>
        {/* //todo exit confirmation */}
        <div className="w-[300px] h-28 flex flex-col items-center justify-around">
          <div className="w-[299px] h-[77px] bg-slate-400 rounded-t-2xl p-2 text-center ">
            Do you want to quit the interview
          </div>
          <div className="flex w-full h-[33px] justify-around rounded-b-2xl">
            <button
              className="h-full w-[149px] bg-slate-400 rounded-bl-2xl "
              onClick={toggleExitOption}
            >
              No
            </button>
            <button
              className="rounded-br-2xl h-full w-[149px] bg-slate-400"
              onClick={backToHome}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default InterviewMEET;

