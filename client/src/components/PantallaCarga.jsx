import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";


const progress = () => {
 const [isLoading, setIsLoading] = useState(true);

 setTimeout(() => {
  setIsLoading(false);
 }, 100);

 const defaultOptionLoadingHome = {
  loop: true,
  autoPlay: true,
  animationData: loading_progress,
  rendererSettings: {
   preserveAspectRatio: "xMidYMid slice"
  }
 }


 return (
  < div >
   <div className={`loading-overlay ${isLoading ? 'visible' : ''}`}>
    <Lottie options={defaultOptionLoadingHome} width={100} height={100} />
   </div>
  </div >
 )
}

