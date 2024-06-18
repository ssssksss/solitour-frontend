import Image from "next/image";
import Link from "next/link";
import { CiBookmark, CiHeart } from "react-icons/ci";

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
      className="w-full max-w-[20rem] rounded-2xl outline outline-[1px] outline-offset-[-1px] outline-[#00B488] hover:bg-[#F2FAF7] lg:max-w-[18.75rem]"
      href={`/meetings/${category}/${id}`}
    >
      <div className="relative flex aspect-square w-full flex-col justify-end rounded-2xl duration-300 hover:scale-105">
        <div className="absolute top-[1.5rem] flex w-full flex-row items-center justify-between px-[1.5rem]">
          <p
            className={`w-fit rounded-full border-2 px-4 py-1 text-sm font-semibold shadow`}
          >
            활동
          </p>
          <div className="text-[#666]">
            <CiBookmark size={"2rem"} />
          </div>
        </div>
        <div className={"h-full w-full rounded-2xl p-[1.5rem] pt-[5rem]"}>
          <div className={"text-lg font-bold text-[#111]"}>
            동해 서핑 투게더
          </div>
          <div className={"pt-[.25rem] text-sm text-[#666]"}> waver </div>
          <div className="flex flex-col gap-[.625rem] pt-[1.25rem]">
            <div className={"flex gap-x-[.625rem] text-xs font-medium"}>
              <Image alt="" src="/calendar-icon.svg" width={12} height={12} />
              <span> 06.08(토) - 06.10(월) 중 미정 </span>
            </div>
            <div className={"flex gap-x-[.625rem] text-xs font-medium"}>
              <Image alt="" src="/location-icon.svg" width={12} height={12} />
              <span> 강원, 동해시</span>
            </div>
            <div className={"flex gap-x-[.625rem] text-xs font-medium"}>
              <Image alt="" src="/clock-icon.svg" width={12} height={12} />
              <span> 08:00 </span>
            </div>
            <div className={"flex gap-x-[.625rem] text-xs font-medium"}>
              <Image alt="" src="/people-icon.svg" width={12} height={12} />
              <span> 1/6 (20-30대, 성별 상관없음) </span>
            </div>
          </div>
          <div
            className={
              "mt-[1.75rem] flex h-[1rem] w-full justify-end gap-[.5rem] text-xs font-medium items-center"
            }
          >
            <div className={"h-[1rem] flex gap-[.25rem]"}>
              <CiHeart size={"1rem"} className={"w-[1rem]"}/> <span> 52 </span>
            </div>
            <div className={"h-[1rem] flex gap-[.25rem] relative"}>
              <Image alt="" src="/eyes-icon.svg" width={16} height={16} />
              <span> 102 </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MeetingsItem;
