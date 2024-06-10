import { CiBookmark } from "react-icons/ci";
import { FaEye, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { CATEGORY_TEXT } from "@/constants/informations/category";
import { MdLocationOn } from "react-icons/md";
import { IoBookmark, IoPeople } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { AiTwotoneClockCircle } from "react-icons/ai";
import Image from "next/image";

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
    <div className="mt-6 flex h-[19rem] w-[19rem] flex-col justify-between rounded-2xl px-5 outline outline-2 outline-gray3 duration-300 hover:bg-[#F2FAF7] hover:outline-main">
      <div className="mt-5 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <p
            className={`w-fit rounded-full px-4 py-1 text-sm font-semibold shadow ${style}`}
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
        <Link className="pt-4 font-bold hover:text-green-200" href={`/`}>
          {title}
        </Link>
        <p className="pt-2 text-sm font-semibold text-gray1">{username}</p>
      </div>
      <div className="flex flex-col pb-5">
        <div className="flex flex-row items-center justify-between">
          <div className="space-y-[0.375rem] text-xs font-semibold">
            <div className="flex flex-row items-center space-x-3">
              <FaRegCalendarCheck />
              <p className="text-gray1">{date.toLocaleDateString()}</p>
            </div>
            <div className="flex flex-row items-center space-x-3">
              <MdLocationOn />
              <p className="text-gray1">{location}</p>
            </div>
            <div className="flex flex-row items-center space-x-3">
              <AiTwotoneClockCircle />
              <p className="text-gray1">{time}</p>
            </div>
          </div>
          <div className="relative my-5 h-[4.875rem] w-[4.875rem] rounded-lg">
            <Image
              className="rounded-lg"
              src={image}
              alt={"image"}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-1 text-xs">
            <IoPeople />
            <p className="text-main">{current}</p>
            <p className="text-gray2">{`/ ${total} ${qualification}`}</p>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center space-x-3">
              <div className="flex flex-row items-center space-x-[0.125rem] text-gray2">
                <FaRegHeart size={"0.75rem"} />
                <p className="text-xs">{likes}</p>
              </div>
              <div className="flex flex-row items-center space-x-[0.125rem] text-gray2">
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
