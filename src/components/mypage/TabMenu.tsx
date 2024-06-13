interface TabMenuProps {
    tabs: { label: string, content: React.ReactNode }[];
    activeIndex: number;
    handleTabClick: (_index: number) => void;
}

const TabMenu = ({ tabs, activeIndex, handleTabClick }: TabMenuProps) => {
  return (
        <div className={"flex flex-col justify-end"}>
            <div className={"flex gap-[2rem] border-gray-200 border-b-2 w-full"}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`text-center relative h-[2rem] ${
                            activeIndex === index ? 'font-bold' : 'text-[#666] font-medium'
                        }`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.label}
                        <div className={`absolute w-full bottom-0 ${activeIndex === index ? "bg-[#111] h-[2px]" : "opacity-0"}`}>  </div>
                    </button>
                ))}
            </div>
            <div className="">
                <div
                    key={activeIndex}
                    className="transition-all duration-300 ease-in-out transform"
                >
                     {tabs[activeIndex].content} 
                </div>
            </div>
        </div>
  );
};
export default TabMenu