"use client";

import LottieFile from "@/../public/lottie/list-not-found.json";
import Lottie from "lottie-react";

interface LottieNotFoundProps {
  text: string;
}

export const LottieNotFound = ({ text }: LottieNotFoundProps) => {
  return (
    <div className="flex aspect-square w-[20rem] flex-col items-center justify-center">
      <Lottie animationData={LottieFile} className="mr-5 w-[8rem]" />
      <p>{text}</p>
    </div>
  );
};
