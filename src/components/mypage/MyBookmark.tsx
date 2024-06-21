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
            className={`outline-[1px]] h-[2rem] w-[3.5rem] rounded-[4rem] text-sm font-semibold ${activeBookmarkMenuIndex == index ? "bg-main text-white" : "bg-white text-gray1 outline outline-offset-[1px] outline-[#E9EBED]"} `}
          >
            {menu[index]}
          </button>
        ))}
      </div>
    </div>
  );
};
export default MyBookmark;
