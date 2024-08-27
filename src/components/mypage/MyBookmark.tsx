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
            className={`outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] h-[2rem] px-2 rounded-[4rem] text-sm  ${activeBookmarkMenuIndex == index ? "bg-main text-white" : "bg-white text-gray1 outline outline-offset-[1px] outline-[#E9EBED]"} `}
          >
            {menu[index]}
          </button>
        ))}
      </div>
    </div>
  );
};
export default MyBookmark;
