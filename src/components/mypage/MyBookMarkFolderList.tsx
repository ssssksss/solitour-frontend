import { FaPlus } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";

const MyBookMarkFolderList = () => {
  return (
    <div className="flex flex-wrap justify-center gap-x-[1.25rem] gap-y-[1.75rem] pt-[2.5rem] lg:justify-start">
      <article className="relative flex max-h-[14.25rem] w-full max-w-[18.75rem] flex-col items-center gap-[1rem]">
        <div className={`${"w-[14rem]"} h-[.5rem] bg-[#F0F0F0]`}> </div>
        <div className={`${"w-[16rem]"} h-[.5rem] bg-[#F0F0F0]`}> </div>
        <div className="relative flex aspect-square w-full flex-col justify-between rounded-2xl bg-gray-100 p-[1.5rem] duration-300 hover:scale-105">
          <div
            className={
              "absolute left-[50%] top-[50%] aspect-square w-[2rem] translate-x-[-50%] translate-y-[-50%]"
            }
          >
            {" "}
            <FaPlus size={"100%"} />{" "}
          </div>
          <p
            className={
              "w-fix absolute left-[50%] top-[100%] aspect-square translate-x-[-50%] translate-y-[-50%]"
            }
          >
            {" "}
            새 리스트 만들기{" "}
          </p>
        </div>
      </article>
      <article className="flex max-h-[14.25rem] w-full max-w-[18.75rem] flex-col items-center gap-[1rem]">
        <div className={`${"w-[14rem]"} h-[.5rem] bg-[#F0F0F0]`}> </div>
        <div className={`${"w-[16rem]"} h-[.5rem] bg-[#F0F0F0]`}> </div>
        <div className="relative flex aspect-square w-full flex-col justify-between rounded-2xl bg-gray-100 p-[1.5rem] duration-300 hover:scale-105">
          <div className={"absolute left-[1.5rem] top-0 h-[3rem] w-[2rem]"}>
            {" "}
            <FaBookmark size={"100%"} color="#a0a0a0" />{" "}
          </div>
          <div
            className={
              "absolute left-[1rem] top-[5rem] h-[3rem] text-lg font-semibold"
            }
          >
            {" "}
            관심 모임{" "}
          </div>
        </div>
      </article>
      <article className="flex max-h-[14.25rem] w-full max-w-[18.75rem] flex-col items-center gap-[1rem]">
        <div className={`${"w-[14rem]"} h-[.5rem] bg-[#F0F0F0]`}> </div>
        <div className={`${"w-[16rem]"} h-[.5rem] bg-[#F0F0F0]`}> </div>
        <div className="relative flex aspect-square w-full flex-col justify-between rounded-2xl bg-gray-100 p-[1.5rem] duration-300 hover:scale-105">
          <div className={"absolute left-[1.5rem] top-0 h-[3rem] w-[2rem]"}>
            {" "}
            <FaBookmark size={"100%"} color="#a0a0a0" />{" "}
          </div>
          <div
            className={
              "absolute left-[1rem] top-[5rem] h-[3rem] text-lg font-semibold"
            }
          >
            {" "}
            나중에 갈 곳{" "}
          </div>
        </div>
      </article>
    </div>
  );
};
export default MyBookMarkFolderList;
