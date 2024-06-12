"use client";

interface MyBoardProps {
  menu: string[];
  onClickMenu: (_index: number) => void;
  activeBoardMenuIndex: number;
}

const MyBoard = ({ menu, onClickMenu, activeBoardMenuIndex }: MyBoardProps) => {
  return (
    <div className="gap-[2rem] pt-[2rem]">
      <div className={"flex gap-[.5rem]"}>
        {menu.map((_, index) => (
          <button
            key={index}
            onClick={() => onClickMenu(index)}
            className={`outline-[1px]] h-[2rem] w-[3.5rem] rounded-[4rem] font-semibold outline outline-offset-[1px] outline-[#E9EBED] ${activeBoardMenuIndex == index ? "bg-[#111] text-white" : "bg-white text-[#666]"} `}
          >
            {" "}
            {menu[index]}{" "}
          </button>
        ))}
      </div>
    </div>
  );
};
export default MyBoard;
