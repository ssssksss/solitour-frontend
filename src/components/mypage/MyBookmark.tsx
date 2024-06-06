

interface MyBookmarkProps {
    menu: string[];
    onClickMenu: (_index: number) => void;
    activeBookmarkMenuIndex: number;
}

const MyBookmark = ({menu, onClickMenu, activeBookmarkMenuIndex}:MyBookmarkProps) => {
 
  return (
      <div className="pt-[2rem] gap-[2rem]">
          <div className={"flex gap-[.5rem]"}>
            {
                menu.map((_,index) => (
                    <button onClick={()=>onClickMenu(index)} className={`font-semibold h-[2rem] rounded-[4rem] w-[3.5rem] outline outline-[#E9EBED] outline-offset-[1px] outline-[1px] ${activeBookmarkMenuIndex == index ? "text-white bg-[#111]" : "text-[#666] bg-white"} `}> {menu[index]} </button>
                ))      
            }
          </div>
      </div> 
  );
};
export default MyBookmark
