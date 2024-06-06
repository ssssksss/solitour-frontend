import { FaPencil } from "react-icons/fa6";

const MyPageHeader = () => {
  return (
    <div className={"max-w-[60rem] w-full flex flex-col"}>
        <h1 className={"text-3xl font-semibold"}> 마이페이지 </h1>   
        <div className={"flex justify-center items-center pb-[5rem] pt-[6.5rem] "}> 
        <article className={" flex flex-col items-center "}>
            <div className={"w-[6.75rem] aspect-square bg-[#D9D9D9] rounded-[3rem] relative mb-[1rem] "}>
            <div className={"absolute right-0 bottom-0 w-[2.5rem] aspect-square bg-[#F4F4F4] rounded-[50%] flex justify-center items-center"}> 
              <FaPencil size={"1.25rem"} />
                </div>
            </div>
            <div className={"text-[#111] font-semibold text-2xl"}> 00님 </div>
            <div className={"text-[#666]"}> test@gmail.com </div>
        </article>
        </div>   
    </div>    
  );
};
export default MyPageHeader