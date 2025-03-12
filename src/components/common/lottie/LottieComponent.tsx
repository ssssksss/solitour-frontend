"use client";

import Lottie from "lottie-react";

interface LottieComponentProps {
  lottieFile: any;
  className?: string;
}

const LottieComponent = ({ lottieFile, className }: LottieComponentProps) => {
  return <Lottie animationData={lottieFile} className={className} />;
};

export default LottieComponent;
