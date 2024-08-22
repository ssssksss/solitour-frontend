import GatheringBookMarkContainer from "@/containers/gathering/GatheringBookmarkContainer";
import GatheringLikeContainer from "@/containers/gathering/GatheringLikeContainer";
import { Gathering } from "@/types/GatheringDto";
import { convertNumberToShortForm } from "@/utils/convertNumberToShortForm";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

const SEX: { [key: string]: string } = {
  ALL: "성별무관",
  MALE: "남성분만",
  FEMALE: "여성분만",
};

// todo
const GatheringItem = (data: Gathering) => {
  return (
    <Link
      href={`/gathering/${data.gatheringId}`}
      className={
        "flex w-full flex-col gap-[1.25rem] rounded-2xl border-0 p-6 outline outline-2 outline-offset-[-2px] outline-gray3 hover:bg-[#F2FAF7] hover:outline-main min-[1025px]:h-[16.5rem] max-[744px]:max-w-[27.5rem] min-[745px]:min-w-[312px] dark:bg-slate-800 dark:outline-slate-400 dark:hover:bg-slate-600"
      }
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <p
            className={`w-fit rounded-full border-[0.0625rem] px-4 py-[0.375rem] text-xs font-semibold shadow`}
          >
            {data.gatheringCategoryName}
          </p>
          <GatheringBookMarkContainer
            isBookMark={data.isBookMark}
            postId={data.gatheringId}
          />
        </div>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap pb-1 pt-6 text-lg font-bold hover:text-main dark:text-slate-200">
          {data.title}
        </p>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-gray1 dark:text-slate-400">
          {data.userName}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="grid gap-[0.625rem] text-sm font-semibold max-[744px]:grid-cols-[auto_7rem] max-[432px]:grid-cols-1 min-[745px]:grid-cols-1 min-[1024px]:grid-cols-2">
          <div className="flex flex-row items-center gap-2">
            {/* 모임 기간 */}
            <Image
              src="/calendar-icon.svg"
              alt="calendar-icon"
              width={14}
              height={14}
            />
            {format(new Date(data.scheduleStartDate), "yyyy-MM-dd")}
            {data.scheduleEndDate &&
              format(new Date(data.scheduleEndDate), "~ yyyy-MM-dd")}
          </div>
          <div className="flex items-center gap-2 text-black dark:text-slate-400 ">
            {/* 모임 장소 */}
            <div className={"h-4 min-w-[0.875rem] flex items-center"}>
              <Image
                src="/location-icon.svg"
                alt="location-icon"
                width={14}
                height={14}
              />
            </div>
            <p className="overflow-hidden truncate whitespace-nowrap">
              {data.zoneCategoryParentName} {","} {data.zoneCategoryChildName}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2 text-black dark:text-slate-400">
            <div className={"flex min-w-fit gap-2"}>
              <div className={"relative h-5 w-[0.875rem]"}>
                {/* 모임 인원 */}
                <Image
                  src="/people-icon.svg"
                  alt="people-icon"
                  width={14}
                  height={14}
                  className="absolute top-[50%] translate-y-[-50%]"
                />
              </div>
              <p
                className={`${data.nowPersonCount == data.personCount && "text-[#ff0000]"}`}
              >
                <span
                  className={`text-main ${data.nowPersonCount / data.personCount > 0.5 && "text-[#FC9F3A]"} ${data.nowPersonCount == data.personCount && "text-[#ff0000]"}`}
                >
                  {data.nowPersonCount}
                </span>
                {"/"}
                {data.personCount}
              </p>
            </div>
            <p>
              {"(" +
                (new Date().getFullYear() - data.startAge) +
                "세 ~ " +
                (new Date().getFullYear() - data.endAge) +
                "세 ," +
                SEX[data.allowedSex] +
                ")"}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            {/* 모임 시간 */}
            <Image
              src="/clock-icon.svg"
              alt="clock-icon"
              width={14}
              height={14}
              className="ml-[.0625rem]"
            />
            <span> {format(new Date(data.scheduleStartDate), "hh:mm")} </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-1">
            <Image src="/pin-icon.png" alt="pin-icon" width={16} height={16} />
            <p className="text-sm dark:text-slate-400">
              모집마감일:
              {format(new Date(data.deadline), "yyyy-MM-dd(EE)", {
                locale: ko,
              })}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-3">
              <GatheringLikeContainer
                likes={data.likeCount}
                isLike={data.isLike}
                gatheringId={data.gatheringId}
              />
              <div className="flex flex-row items-center gap-1 text-gray2 dark:text-slate-400">
                <Image
                  src="/eyes-icon.svg"
                  alt="eyes-icon"
                  width={15}
                  height={15}
                />
                <p className="text-sm">
                  {convertNumberToShortForm(data.viewCount)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GatheringItem;
