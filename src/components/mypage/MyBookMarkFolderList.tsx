import { FaPlus } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";

const MyBookMarkFolderList = () => {
  return (
      <div className="flex flex-wrap gap-x-[1.25rem] gap-y-[1.75rem] pt-[2.5rem] justify-center lg:justify-start">
      <article className="w-full max-w-[18.75rem] max-h-[14.25rem] flex flex-col gap-[1rem] items-center relative ">
        <div className={`${"w-[14rem]"} h-[.5rem] bg-[#F0F0F0]`}>  </div>
        <div className={`${"w-[16rem]"} h-[.5rem] bg-[#F0F0F0]`}>  </div>
            <div className="relative flex aspect-square w-full flex-col justify-between rounded-2xl p-[1.5rem] duration-300 hover:scale-105 bg-gray-100">
              <div className={"left-[50%] top-[50%] absolute translate-x-[-50%] translate-y-[-50%] w-[2rem] aspect-square"}> <FaPlus size={"100%"}/> </div>
              <p className={"left-[50%] top-[100%] absolute translate-x-[-50%] translate-y-[-50%] w-fix aspect-square"}> 새 리스트 만들기 </p>
            </div>
        </article>
      <article className="w-full max-w-[18.75rem] max-h-[14.25rem] flex flex-col gap-[1rem] items-center ">
        <div className={`${"w-[14rem]"} h-[.5rem] bg-[#F0F0F0]`}>  </div>
        <div className={`${"w-[16rem]"} h-[.5rem] bg-[#F0F0F0]`}>  </div>
            <div className="relative flex aspect-square w-full flex-col justify-between rounded-2xl p-[1.5rem] duration-300 hover:scale-105 bg-gray-100">
              <div className={"left-[1.5rem] top-0 absolute w-[2rem] h-[3rem]"}> <FaBookmark size={"100%"} color="#a0a0a0" /> </div>
              <div className={"left-[1rem] top-[5rem] absolute h-[3rem] font-semibold text-lg"}> 관심 모임 </div>
            </div> 
        </article>
      <article className="w-full max-w-[18.75rem] max-h-[14.25rem] flex flex-col gap-[1rem] items-center ">
        <div className={`${"w-[14rem]"} h-[.5rem] bg-[#F0F0F0]`}>  </div>
        <div className={`${"w-[16rem]"} h-[.5rem] bg-[#F0F0F0]`}>  </div>
            <div className="relative flex aspect-square w-full flex-col justify-between rounded-2xl p-[1.5rem] duration-300 hover:scale-105 bg-gray-100">
              <div className={"left-[1.5rem] top-0 absolute w-[2rem] h-[3rem]"}> <FaBookmark size={"100%"} color="#a0a0a0" /> </div>
              <div className={"left-[1rem] top-[5rem] absolute h-[3rem] font-semibold text-lg"}> 나중에 갈 곳 </div>
            </div> 
        </article>
      </div> 
  );
};
export default MyBookMarkFolderList
