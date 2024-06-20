import Link from "next/link";
import { AiTwotoneClockCircle } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoBookmark, IoPeople } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";

type MyProps = {
  id: number;
  category: string;
  bookmark: boolean;
  title: string;
  username: string;
  date: Date;
  location: string;
  time: string;
  image: string;
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
  image,
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
    <div className="flex h-[19rem] w-[19rem] flex-col justify-between rounded-2xl p-5 outline outline-2 outline-gray3 duration-300 hover:bg-[#F2FAF7] hover:outline-main">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <p
            className={`w-fit rounded-full border-2 px-4 py-[0.375rem] text-xs font-semibold shadow ${style}`}
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
              className="cursor-pointer text-gray1 hover:scale-110"
              size={"2rem"}
            />
          )}
        </div>
        <Link
          className="pb-3 pt-6 font-bold hover:text-green-200"
          href={`/meetings/1`}
        >
          {title}
        </Link>
        <p className="text-sm font-medium text-gray1">{username}</p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <div className="space-y-[0.375rem] text-xs font-medium">
            <div className="flex flex-row items-center gap-3">
              <FaRegCalendarCheck />
              <p className="text-black">{date.toLocaleDateString()}</p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <MdLocationOn />
              <p className="text-black">{location}</p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <AiTwotoneClockCircle />
              <p className="text-balck">{time}</p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <IoPeople />
              <p>
                <span className="text-main">{current}</span>
                <span className="text-black">{` / ${total} `}</span>
                <span className="font-medium text-gray2">{`${qualification}`}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center space-x-3">
              <div className="flex flex-row items-center gap-1 text-gray2">
                <FaRegHeart size={"0.8rem"} />
                <p className="text-xs">{likes}</p>
              </div>
              <div className="flex flex-row items-center gap-1 text-gray2">
                <FaEye />
                <p className="text-xs">{views}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingItem;
