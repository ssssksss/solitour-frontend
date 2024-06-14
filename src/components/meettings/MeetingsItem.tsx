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
const MeetingsItem = ({
  id,
  category,
  title,
  userName,
  date,
  place,
  time,
  joinMember,
  limitMember,
}: MyProps) => {
  return (
    <Link
      className="w-full max-w-[20rem] rounded-2xl p-[1.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#00B488] hover:bg-[#F2FAF7] lg:max-w-[18.75rem]"
      href={`/meetings/${category}/${id}`}
    >
      <div className="relative flex aspect-square w-full flex-col rounded-2xl duration-300 hover:scale-105">
        <div className="flex w-full justify-between">
          <div
            className={`w-fit rounded-full border-2 px-[1rem] py-[.5rem] text-sm font-semibold text-[#333]`}
          >
            {" "}
            전시{" "}
          </div>
          <div className="text-[#000]">
            <CiBookmark size={"2rem"} />
          </div>
        </div>
        <div className={"mt-[1rem] text-lg font-semibold text-[#111]"}>
          {title}
        </div>
        <div className={"text-sm text-[#666]"}> {userName} </div>
        <div className="flex justify-between pt-[3.75rem]">
          <div className={"flex flex-col gap-[.625rem]"}>
            <div className={"flex h-[1rem] gap-[.75rem] text-sm"}>
              {" "}
              <FaCalendar /> <div className="flex items-center">
                {" "}
                {date}{" "}
              </div>{" "}
            </div>
            <div className={"flex h-[1rem] gap-[.75rem] text-sm"}>
              {" "}
              <FaLocationPin />{" "}
              <div className="flex items-center"> {place} </div>{" "}
            </div>
            <div className={"flex h-[1rem] gap-[.75rem] text-sm"}>
              {" "}
              <FaClock /> <div className="flex items-center"> {time} </div>
            </div>
          </div>
          <div className="relative aspect-square h-[5rem] rounded-xl">
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
          <div
            className={
              "grid h-[1rem] w-full grid-cols-[3rem_auto_6.5rem] gap-[.125rem] text-xs"
            }
          >
            <div className="flex items-center gap-[0.125rem]">
              <FaPeopleGroup />
              <span className="text-[#00B488]"> {joinMember} </span>
              <span> / {99} </span>
            </div>
            <div>
              <span className="text-[#A3A3A3]">
                {" "}
                {"30대, 성별 상관없음".split(",").map((i) => (
                  <p key={i}> {i} </p>
                ))}{" "}
              </span>
            </div>
            <div className="flex flex-row items-center space-x-3">
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
