import React from "react";
import { SupportAboutBanner } from "./SupportAboutBanner";
import { SupportAboutInformation } from "./SupportAboutInformation";
import { SupportAboutGathering } from "./SupportAboutGathering";
import { SupportAboutDiary } from "./SupportAboutDiary";

export const SupportAbout = () => {
  return (
    <div className="mt-10 flex w-full flex-col">
      <SupportAboutBanner />
      <div className="h-140" />
      <SupportAboutInformation />
      <div className="h-127" />
      <SupportAboutGathering />
      <div className="h-127" />
      <SupportAboutDiary />
      <div className="h-127" />
    </div>
  );
};
