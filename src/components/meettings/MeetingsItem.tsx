import Image from "next/image";
import Link from "next/link";
import { CiBookmark } from "react-icons/ci";
import { FaCalendar, FaClock, FaEye, FaRegHeart } from "react-icons/fa";
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
      className="w-full max-w-[20rem] rounded-2xl lg:max-w-[18.75rem] outline outline-[1px] outline-offset-[-1px] outline-[#00B488] p-[1.5rem] hover:bg-[#F2FAF7]"
      href={`/meetings/${category}/${id}`}
        >
      <div className="relative flex aspect-square w-full flex-col rounded-2xl duration-300 hover:scale-105 ">
        <div className="flex justify-between w-full">
          <div className={`text-[#333] w-fit rounded-full border-2 px-[1rem] py-[.5rem] text-sm font-semibold`}> 전시 </div>
            <div className="text-[#000]">
              <CiBookmark size={"2rem"} />
            </div>
          </div>
          <div className={"text-[#111] font-semibold text-lg mt-[1rem]"}>         
            {title}
          </div> 
        <div className={"text-sm text-[#666]"}> {userName} </div> 
      <div className="pt-[3.75rem] flex justify-between">
        <div className={"flex flex-col gap-[.625rem]"}> 
          <div className={"flex gap-[.75rem] h-[1rem] text-sm"}> <FaCalendar /> <div className="flex items-center"> {date} </div> </div>
          <div className={"flex gap-[.75rem] h-[1rem] text-sm"}> <FaLocationPin /> <div className="flex items-center"> {place} </div> </div>
          <div className={"flex gap-[.75rem] h-[1rem] text-sm"}> <FaClock /> <div className="flex items-center"> {time} </div></div>
          </div>
          <div className="h-[5rem] aspect-square rounded-xl relative">
            <Image
              className="rounded-2xl"
              src={"./meeting1.svg"}
              alt={"MeetingImage"}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div> 
        <div className="flex flex-row justify-between pt-[1.25rem]">
          <div className={"w-full grid grid-cols-[3rem_auto_6.5rem] gap-[.125rem] h-[1rem] text-xs"}>
            <div className="flex items-center  gap-[0.125rem]">
              <FaPeopleGroup />
              <span className="text-[#00B488]"> {joinMember}  </span>
              <span> / {99} </span>
            </div>
            <div>
              <span className="text-[#A3A3A3]"> {"30대, 성별 상관없음".split(',').map(i => <p> {i} </p>)} </span>
            </div>
          <div className="flex flex-row items-center space-x-3 ">
            <div className="flex flex-row items-center space-x-[0.125rem] text-gray2">
              <FaRegHeart size={"0.75rem"} />
              <p className="text-xs">200K</p>
            </div>
            <div className="flex flex-row items-center space-x-[0.125rem] text-gray2">
              <FaEye />
              <p className="text-xs">200K</p>
            </div>
          </div>
        </div>
        </div>
      </div>
      </Link>
  );
};

export default MeetingsItem;
