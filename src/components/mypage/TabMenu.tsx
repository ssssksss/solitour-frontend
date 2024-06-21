interface TabMenuProps {
    tabs: { label: string, content: React.ReactNode }[];
    activeIndex: number;
    handleTabClick: (_index: number) => void;
}

const TabMenu = ({ tabs, activeIndex, handleTabClick }: TabMenuProps) => {
  return (
    <div className={"flex flex-col justify-end"}>
      <div className={"flex w-full gap-[2rem] border-b-2 border-gray-200"}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`relative h-[2rem] text-center ${
              activeIndex === index
                ? "font-bold text-[#00B488]"
                : "font-medium text-[#666]"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
            <div
              className={`absolute bottom-0 w-full ${activeIndex == index ? "h-[2px] bg-[#00B488]" : "opacity-0"}`}
            >
            </div>
          </button>
        ))}
      </div>
      <div className="">
        <div
          key={activeIndex}
          className="transform transition-all duration-300 ease-in-out"
        >
          {tabs[activeIndex].content}
        </div>
      </div>
    </div>
  );
};
export default TabMenu