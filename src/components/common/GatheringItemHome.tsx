import GatheringBookMarkContainer from "@/containers/gathering/read/GatheringBookmarkContainer";
import GatheringLikeContainer from "@/containers/gathering/read/GatheringLikeContainer";
import { GatheringRecommend } from "@/types/GatheringDto";
import { convertNumberToShortForm } from "@/utils/convertNumberToShortForm";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

interface IGatheringItemHome {
  data: GatheringRecommend;
}

const SEX: { [key: string]: string } = {
  ALL: "성별무관",
  MALE: "남성분만",
  FEMALE: "여성분만",
};

const categoryStyle: { [key: string]: string } = {
  취미: "outline-[#FFDDEF] text-[#C5006A] bg-[#FFF2F9]",
  활동: "outline-[#DDE5FF] text-[#0036C2] bg-[#F2F6FF]",
};

// const statusStyle: { [key: string]: string } = {
//   WAIT: "outline-none text-white bg-gray2",
//   CONSENT: "outline-none text-white bg-main",
//   REFUSE: "outline-none text-white bg-[#EE4C4A]",
// };

// const status: {[key: string]: string} = {
//   WAIT: "대기",
//   CONSENT: "승인",
//   REFUSE: "거절",
// };

// todo
const GatheringItemHome = ({ data }: IGatheringItemHome) => {
  return (
    <Link
      href={`/gathering/${data.gatheringId}`}
      className={`flex h-[19.6875rem] flex-col gap-[1.25rem] rounded-2xl border-0 p-6 text-black outline outline-2 outline-gray3 hover:bg-[#F2FAF7] hover:outline-main`}
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <p
            className={`flex h-[2rem] w-fit items-center rounded-full px-4 py-[0.375rem] text-xs font-semibold outline outline-[1px] outline-offset-[-1px] ${categoryStyle[data.gatheringCategoryName]}`}
          >
            <span>{data.gatheringCategoryName}</span>
          </p>
          <GatheringBookMarkContainer
            isBookMark={data.isBookMark}
            postId={data.gatheringId}
          />
        </div>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap pb-1 pt-6 text-lg font-bold hover:text-main">
          {data.title}
        </p>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-gray1">
          {data.userName}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-[0.625rem] text-sm font-semibold">
          <div className="flex flex-row items-center gap-2">
            {/* 모임 기간 */}
            <Image
              src={`/calendar-icon.svg`}
              alt="calendar-icon"
              width={14}
              height={14}
            />
            {format(new Date(data.scheduleStartDate), "yyyy-MM-dd")}
            {data.scheduleEndDate &&
              format(new Date(data.scheduleEndDate), "~ yyyy-MM-dd")}
          </div>
          <div className=":text-slate-400 flex items-center gap-2">
            {/* 모임 장소 */}
            <div className={"flex h-4 min-w-[0.875rem] items-center"}>
              <Image
                src={`/location-icon.svg`}
                alt="location-icon"
                width={14}
                height={14}
              />
            </div>
            <p className="overflow-hidden truncate whitespace-nowrap">
              {data.zoneCategoryParentName} {","} {data.zoneCategoryChildName}
            </p>
          </div>
          <article className="flex flex-col-reverse gap-2">
            <div className="flex items-center gap-2">
              <div className={"flex min-w-fit gap-2"}>
                <div className={"relative h-5 w-[0.875rem]"}>
                  {/* 모임 인원 */}
                  <Image
                    src={`/people-icon.svg`}
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
                    className={`${data.nowPersonCount / data.personCount > 0.5 ? "text-[#FC9F3A]" : "text-main"} ${data.nowPersonCount == data.personCount && "text-[#ff0000]"}`}
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
            <div
              className="flex items-center gap-2"
              style={{ lineHeight: "100%" }}
            >
              {/* 모임 시간 */}
              <Image
                src={`/clock-icon.svg`}
                alt="clock-icon"
                width={14}
                height={14}
                className="ml-[.0625rem] translate-y-[1px]"
              />
              <span className="flex h-full items-center text-sm">
                {format(new Date(data.scheduleStartDate), "hh:mm")}
              </span>
            </div>
          </article>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-1">
            <Image
              src={`/pin-icon.svg`}
              alt="pin-icon"
              width={16}
              height={16}
            />

            <p className="text-sm">
              마감일:
              {format(new Date(data.deadline), "yy-MM-dd(EE)", {
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
              <div className="flex flex-row items-center gap-1 text-gray2">
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

export default GatheringItemHome;
