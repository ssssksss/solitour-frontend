import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationPin, FaPeopleGroup } from "react-icons/fa6";

type MyProps = {
    id: number;
    category: string;
    title: string;
    userName: string;
    date: string;
    place: string;
    time: string;
    joinMember: number;
    limitMember: number;
};

// todo
const MeetingsItem = ({ id, category, title, userName, date, place, time, joinMember, limitMember }: MyProps) => {

  return (
            <Link
          className="w-full max-w-[20rem] lg:max-w-[18.75rem]"
          href={`/meetings/${category}/${id}`}
        >
    <div className={"relative flex p-[1.5rem] aspect-square w-full flex-col justify-between rounded-2xl duration-300 hover:scale-105 outline outline-[#d9d9d9] outline-offset-[1px] outline-[1px] rounded-2xl"}>
      <div className="left-0 top-[50%] translate-y-[-50%] absolute rounded-2xl w-full  bg-gray-100">
        </div>
      <div className="">
        <div className={`text-[#333] w-fit rounded-full border-2 px-[1rem] py-[.5rem] text-sm font-semibold`}> 전시 </div>
        <div className={"text-[#111] font-semibold text-lg mt-[1rem]"}> {title} </div> 
        <div className={"text-sm text-[#666]"}> {userName} </div> 
      </div>
      <div className={"pt-[3.75rem] flex flex-col gap-[.5rem]"}> 
        <div className={"flex gap-[.5rem] h-[1rem]"}> <FaCalendar /> <div className="flex items-center"> {date} </div> </div>
        <div className={"flex gap-[.5rem] h-[1rem]"}> <FaLocationPin /> <div className="flex items-center"> {place} </div> </div>
        <div className={"flex gap-[.5rem] h-[1rem]"}> <FaClock /> <div className="flex items-center"> {time} </div></div>
        <div className={"flex gap-[.5rem] h-[1rem]"}> <FaPeopleGroup /> <div className="flex items-center"> {joinMember} / {limitMember} </div></div>
      </div>
      </div>
      </Link>
  );
};

export default MeetingsItem;
