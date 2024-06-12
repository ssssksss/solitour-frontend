interface MyBookmarkProps {
  menu: string[];
  onClickMenu: (_index: number) => void;
  activeBookmarkMenuIndex: number;
}

const MyBookmark = ({
  menu,
  onClickMenu,
  activeBookmarkMenuIndex,
}: MyBookmarkProps) => {
  return (
    <div className="gap-[2rem] pt-[2rem]">
      <div className={"flex gap-[.5rem]"}>
        {menu.map((_, index) => (
          <button
            key={index}
            onClick={() => onClickMenu(index)}
            className={`h-[2rem] w-[3.5rem] rounded-[4rem] font-semibold outline outline-[1px] outline-offset-[1px] outline-[#E9EBED] ${activeBookmarkMenuIndex == index ? "bg-[#111] text-white" : "bg-white text-[#666]"} `}
          >
            {" "}
            {menu[index]}{" "}
          </button>
        ))}
      </div>
    </div>
  );
};
export default MyBookmark;
