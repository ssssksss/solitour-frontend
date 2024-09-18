"use client";

import LottieFile from "@/../public/lottie/list-not-found.json";
import LottieComponent from "./LottieComponent";


const LottieNotFound = ({text}: {text: string}) => {
  return (
    <div className="relative w-[20rem] aspect-square flex justify-center items-center">
      <LottieComponent
        lottieFile={LottieFile}
        className={"w-[4.375rem]"}
      />
      <p className="w-full flex justify-center absolute bottom-1/2 translate-y-[4.375rem] left-1/2 -translate-x-1/2"> {text} </p>
    </div>
  );
};

export default LottieNotFound;
