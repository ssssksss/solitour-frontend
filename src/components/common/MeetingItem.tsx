import Image from "next/image";
import Link from "next/link";
import { BsFillPeopleFill } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";

type MyProps = {
  id: number;
  category: string;
  bookmark: boolean;
  title: string;
  username: string;
  date: Date;
  location: string;
  time: string;
  current: number;
  total: number;
  qualification: string;
  likes: number;
  views: number;
};

// todo
const MeetingItem = ({
  id,
  category,
  bookmark,
  title,
  username,
  date,
  location,
  time,
  current,
  total,
  qualification,
  likes,
  views,
}: MyProps) => {
  let style = "";
  switch (category) {
    case "취향":
      style = "border-[#FFDDEF] bg-[#FFF2F9] text-[#C5006A]";
      break;
    case "활동":
      style = "border-[#DDE5FF] bg-[#F2F6FF] text-[#0036C2]";
      break;
    default:
      break;
  }

  return (
    <div className="flex h-[19rem] w-[19rem] flex-col justify-between rounded-2xl p-5 outline outline-2 outline-gray3 duration-300 hover:bg-[#F2FAF7] hover:outline-main dark:bg-slate-800 dark:outline-slate-400 dark:hover:bg-slate-600">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <p
            className={`w-fit rounded-full border-[0.0625rem] px-4 py-[0.375rem] text-xs font-semibold shadow ${style}`}
          >
            {category}
          </p>
          {bookmark ? (
            <IoBookmark
              className="cursor-pointer text-[#F85E5E] hover:scale-110"
              size={"2rem"}
            />
          ) : (
            <CiBookmark
              className="cursor-pointer text-gray1 hover:scale-110 dark:text-slate-200"
              size={"2rem"}
            />
          )}
        </div>
        <Link
          className="pb-1 pt-6 text-lg font-bold hover:text-main dark:text-slate-200"
          href={`/meetings/1`}
        >
          {title}
        </Link>
        <p className="text-sm font-medium text-gray1 dark:text-slate-400">
          {username}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <div className="space-y-[0.375rem] text-sm font-medium">
            <div className="flex flex-row items-center gap-3">
              <Image
                src="/calendar-icon.svg"
                alt="calendar-icon"
                width={10}
                height={10}
              />
              <p className="text-black dark:text-slate-400">
                {date.getFullYear() +
                  "." +
                  (date.getMonth() + 1) +
                  "." +
                  date.getDate()}
              </p>
            </div>
            <div className="-ml-[2px] flex flex-row items-center gap-2 text-black dark:text-slate-400">
              <TiLocation />
              <p>{location}</p>
            </div>
            <div className="flex flex-row items-center gap-3 text-black dark:text-slate-400">
              <Image
                src="/clock-icon.svg"
                alt="clock-icon"
                width={10}
                height={10}
              />
              <p>{time}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <BsFillPeopleFill className="-ml-[0.125rem] text-black dark:text-slate-400" />
              <p>
                <span className="text-main">{current}</span>
                <span className="text-black dark:text-slate-400">{` / ${total} `}</span>
                <span className="font-medium text-gray2 dark:text-slate-400">{`${qualification}`}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="-ml-1 flex flex-row items-center gap-1">
            <Image src="/pin-icon.png" alt="pin-icon" width={16} height={16} />
            <p className="text-sm dark:text-slate-400">모집마감일: 06.07(금)</p>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-1 text-gray2 dark:text-slate-400">
                <FaRegHeart size={"0.8rem"} />
                <p className="text-sm">{likes}</p>
              </div>
              <div className="flex flex-row items-center gap-1 text-gray2 dark:text-slate-400">
                <Image
                  src="/eyes-icon.svg"
                  alt="eyes-icon"
                  width={15}
                  height={15}
                />
                <p className="text-sm">{views}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingItem;
