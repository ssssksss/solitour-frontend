import React from "react";
import SupportAboutBanner from "./SupportAboutBanner";
import SupportAboutInformation from "./SupportAboutInformation";
import SupportAboutGathering from "./SupportAboutGathering";
import SupportAboutDiary from "./SupportAboutDiary";

const SupportAbout = () => {
  return (
    <div className="mt-10 flex w-full flex-col">
      <SupportAboutBanner />
      <div className="h-[35rem]" />
      <SupportAboutInformation />
      <div className="h-[31.75rem]" />
      <SupportAboutGathering />
      <div className="h-[31.75rem]" />
      <SupportAboutDiary />
      <div className="h-[31.75rem]" />
    </div>
  );
};

export default SupportAbout;
