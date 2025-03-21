"use client";

import MyPageInformationList from "./MyPageInformationList";
import MyPageGatheringList from "./MyPageGatheringList";
import { useMyPageTabMenu } from "../model/useMyPageTabMenu";

const tabs = [
  {
    label: "정보",
    active: { name: "mainCategory", value: "정보" },
    content: <MyPageInformationList />,
    href: "/mypage?mainCategory=정보&category=owner",
  },
  {
    label: "모임",
    active: { name: "mainCategory", value: "모임" },
    content: <MyPageGatheringList />,
    href: "/mypage?mainCategory=모임&category=host",
  },
];

interface MyPageItemListProps {
  defaultActive: number;
}

export const MyPageItemList = ({ defaultActive }: MyPageItemListProps) => {
  const { activeIndex, handleTabClick } = useMyPageTabMenu(tabs, defaultActive);

  return (
    <div>
      <div className="flex w-full gap-[1.625rem] border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={[
              activeIndex === index
                ? "text-main font-bold"
                : "text-gray1 font-medium",
              "relative h-8 w-16 text-center",
            ].join(" ")}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
            <div
              className={[
                `${activeIndex == index ? "bg-main h-0.5" : "opacity-0"}`,
                "absolute bottom-[-1.5px] w-full",
              ].join(" ")}
            />
          </button>
        ))}
      </div>
      <div
        key={activeIndex}
        className="transform whitespace-nowrap transition-all duration-300 ease-in-out"
      >
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};
