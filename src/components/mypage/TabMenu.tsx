"use client";

import { useTabMenu } from "@/hooks/mypage/useTabMenu";

interface TabMenuProps {
  tabs: {
    label: string;
    content: React.ReactNode;
    href?: string;
    active: { name: string; value: string };
  }[];
  defaultActive: number;
}

const TabMenu = ({ tabs, defaultActive }: TabMenuProps) => {
  const { activeIndex, handleTabClick } = useTabMenu(tabs, defaultActive);

  return (
    <div className="flex flex-col justify-end">
      <div className="flex w-full gap-[1.625rem] border-b-[1px] border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`relative h-[2rem] w-[4rem] text-center ${
              activeIndex === index
                ? "font-bold text-[#00B488]"
                : "font-medium text-[#666]"
            }`}
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

export default TabMenu;
