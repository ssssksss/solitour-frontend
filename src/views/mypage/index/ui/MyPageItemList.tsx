"use client";

import { useMyPageItemList } from "../model/useMyPageItemList";
import { MyPageGatheringList } from "./MyPageGatheringList";
import { MyPageInformationList } from "./MyPageInformationList";

const tabList = [
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
  defaultActiveIndex: number;
}

export const MyPageItemList = ({ defaultActiveIndex }: MyPageItemListProps) => {
  const { activeIndex, handleTabClick } = useMyPageItemList(
    tabList,
    defaultActiveIndex,
  );

  return (
    <div>
      <div className="flex w-full gap-[1.625rem] border-b border-gray-200">
        {tabList.map((tab, index) => (
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
                `${activeIndex === index ? "bg-main h-0.5" : "opacity-0"}`,
                "absolute bottom-[-1.5px] w-full",
              ].join(" ")}
            />
          </button>
        ))}
      </div>
      <div className="transform whitespace-nowrap transition-all duration-300 ease-in-out">
        {tabList[activeIndex].content}
      </div>
    </div>
  );
};
