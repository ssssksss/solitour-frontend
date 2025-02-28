"use client";

import MyPageGatheringContainer from "@/containers/mypage/MyPageGatheringContainer";
import MyPageInformationContainer from "@/containers/mypage/MyPageInformationContainer";
import { useTabMenu } from "@/hooks/mypage/useTabMenu";

const tabs = [
  {
    label: "정보",
    active: { name: "mainCategory", value: "정보" },
    content: <MyPageInformationContainer />,
    href: "/mypage?mainCategory=정보&category=owner",
  },
  {
    label: "모임",
    active: { name: "mainCategory", value: "모임" },
    content: <MyPageGatheringContainer />,
    href: "/mypage?mainCategory=모임&category=host",
  },
];

interface MyPageTabMenuProps {
  defaultActive: number;
}

const MyPageTabMenu = ({ defaultActive }: MyPageTabMenuProps) => {
  const { activeIndex, handleTabClick } = useTabMenu(tabs, defaultActive);

  return (
    <div className="flex flex-col justify-end">
      <div className="flex w-full gap-[1.625rem] border-b-[1px] border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={
              (activeIndex === index
                ? "font-bold text-[#00B488]"
                : "font-medium text-[#666]") +
              "relative h-[2rem] w-[4rem] text-center"
            }
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
            <div
              className={`absolute bottom-[-1.5px] w-full ${activeIndex == index ? "h-0.5 bg-[#00B488]" : "opacity-0"}`}
            ></div>
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

export default MyPageTabMenu;
