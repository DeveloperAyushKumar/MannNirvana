import { useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation";

const StaticLottie = ({ text }) => {
  const lottieRef = useRef(null);
  const wordsPerSecond = 2.5; // Average speaking speed
  const wordCount = text.split(" ").length;
  const duration = (wordCount / wordsPerSecond) * 1000;

  const playAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.play();
      setTimeout(() => lottieRef.current.stop(), duration); // Play for 3 seconds
    }
  };

  return (
    <div>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false} // Play only once
      />
      <button onClick={playAnimation}>Play Animation</button>
    </div>
  );
};

export default StaticLottie;