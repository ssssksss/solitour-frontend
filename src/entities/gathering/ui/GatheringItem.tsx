import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Gathering } from "@/entities/gathering";
import { convertNumberToShortForm } from "@/shared/lib/utils";
import React from "react";

interface GatheringItemProps {
  gathering: Gathering;
  isAccessGathering: boolean;
  gatheringBookmarkComponent: React.ReactNode;
  gatheringLikeComponent: React.ReactNode;
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

const statusStyle: { [key: string]: string } = {
  WAIT: "outline-hidden text-white bg-gray2",
  CONSENT: "outline-hidden text-white bg-main",
  REFUSE: "outline-hidden text-white bg-[#EE4C4A]",
};

const status: { [key: string]: string } = {
  WAIT: "대기",
  CONSENT: "승인",
  REFUSE: "거절",
};

export const GatheringItem = ({
  gathering,
  isAccessGathering,
  gatheringBookmarkComponent,
  gatheringLikeComponent,
}: GatheringItemProps) => {
  return (
    <Link
      href={`/gathering/${gathering.gatheringId}`}
      className={`flex w-full ${gathering.isFinish || format(new Date(gathering.deadline), "yyyyMMdd") < format(new Date(), "yyyyMMdd") ? "text-gray2" : "text-black"} outline-gray3 hover:bg-lightGreen hover:outline-main h-full max-h-[19.6875rem] flex-col gap-[1.25rem] rounded-2xl border-0 p-5 outline outline-offset-[-2px] duration-300`}
      onClick={(e) => {
        if (!isAccessGathering) {
          e.preventDefault();
        }
      }}
    >
      <div className="flex flex-col">
        {/* 상태와 북마크 */}
        <div className="flex flex-row items-center justify-between">
          <p
            className={`relative flex h-[2rem] w-fit items-center rounded-full px-4 py-[0.375rem] text-xs font-semibold outline outline-offset-[-1px] ${gathering.isFinish || format(new Date(gathering.deadline), "yyyyMMdd") < format(new Date(), "yyyyMMdd") ? "bg-gray2 text-white" : gathering.gatheringStatus ? statusStyle[gathering.gatheringStatus] : categoryStyle[gathering.gatheringCategoryName]}`}
          >
            <span>
              {gathering.gatheringStatus
                ? status[gathering.gatheringStatus]
                : gathering.gatheringCategoryName}
            </span>
          </p>
          {gatheringBookmarkComponent}
        </div>
        {/* 제목, 유저 닉네임 */}
        <p className="hover:text-main overflow-hidden pt-6 pb-1 text-lg font-bold text-ellipsis whitespace-nowrap">
          {gathering.title}
        </p>
        <p className="text-gray1 overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap">
          {gathering.nickname}
        </p>
      </div>
      {/* 마감일 포함 영역 */}
      <div className="flex w-full flex-col gap-[0.625rem]">
        {/* 4개 영역(기간, 장소, 시간, 인원) */}
        <div className="flex flex-col gap-[0.625rem]">
          <div className="gap-[0.625rem] text-sm font-semibold max-[432px]:flex max-[432px]:flex-col min-[432px]:grid min-[432px]:grid-cols-[auto_7rem] min-[744px]:flex min-[744px]:grid-cols-1 min-[744px]:flex-col-reverse">
            <article className="flex flex-row items-center gap-2">
              {/* 모임 기간 */}
              <Image
                src={`${gathering.isFinish || format(new Date(gathering.deadline), "yyyyMMdd") < format(new Date(), "yyyyMMdd") ? "/icons/gathering-calendar-gray-icon.svg" : "/icons/gathering-calendar-icon.svg"}`}
                alt="gathering-calendar-icon"
                width={16}
                height={16}
              />
              {format(new Date(gathering.scheduleStartDate), "yyyy.MM.dd")}
              {format(new Date(gathering.scheduleStartDate), "yyyyMMdd") !=
                format(new Date(gathering.scheduleEndDate), "yyyyMMdd") && (
                <span>
                  {format(new Date(gathering.scheduleEndDate), "- yyyy.MM.dd")}
                </span>
              )}
            </article>
            <article className="flex h-[1.25rem] items-center gap-2">
              {/* 모임 장소 */}
              <div className={"flex items-center"}>
                <Image
                  src={`${gathering.isFinish || format(new Date(gathering.deadline), "yyyyMMdd") < format(new Date(), "yyyyMMdd") ? "/icons/location-gray-icon.svg" : "/icons/location-icon.svg"}`}
                  alt="location-icon"
                  width={16}
                  height={16}
                />
              </div>
              <p className="truncate overflow-hidden whitespace-nowrap">
                {gathering.zoneCategoryParentName === "세종"
                  ? "세종특별자치시"
                  : `${gathering.zoneCategoryParentName}, ${gathering.zoneCategoryChildName}`}
              </p>
            </article>
          </div>
          <div className="gap-2.5 text-sm font-semibold max-[432px]:flex max-[432px]:flex-col-reverse min-[432px]:grid min-[432px]:grid-cols-[auto_7rem] min-[744px]:flex min-[744px]:grid-cols-1 min-[744px]:flex-col-reverse">
            <article className="flex h-[1.25rem] w-full flex-row items-center gap-2">
              <div className={"flex min-w-fit gap-2"}>
                <div className={"relative flex items-center"}>
                  {/* 모임 인원 */}
                  <Image
                    src={`${gathering.isFinish || format(new Date(gathering.deadline), "yyyyMMdd") < format(new Date(), "yyyyMMdd") ? "/icons/people-gray-icon.svg" : "/icons/people-icon.svg"}`}
                    alt="people-icon"
                    width={16}
                    height={16}
                  />
                </div>
                <p
                  className={
                    gathering.nowPersonCount === gathering.personCount
                      ? "text-[#ff0000]"
                      : ""
                  }
                >
                  <span
                    className={`${gathering.isFinish || format(new Date(gathering.deadline), "yyyyMMdd") < format(new Date(), "yyyyMMdd") ? "text-gray2" : gathering.nowPersonCount / gathering.personCount > 0.5 ? "text-[#FC9F3A]" : "text-main"} ${gathering.nowPersonCount == gathering.personCount && "text-[#ff0000]"}`}
                  >
                    {gathering.nowPersonCount}
                  </span>
                  {"/"}
                  {gathering.personCount}
                </p>
              </div>
              <p>
                {"(" +
                  (new Date().getFullYear() - gathering.startAge) +
                  "세 ~ " +
                  (new Date().getFullYear() - gathering.endAge) +
                  "세, " +
                  SEX[gathering.allowedSex] +
                  ")"}
              </p>
            </article>
            <article
              className="flex h-5 items-center gap-2"
              style={{ lineHeight: "100%" }}
            >
              <div className={"relative"}>
                {/* 모임 시간 */}
                <Image
                  src={`${gathering.isFinish || format(new Date(gathering.deadline), "yyyyMMdd") < format(new Date(), "yyyyMMdd") ? "/icons/clock-gray-icon.svg" : "/icons/clock-icon.svg"}`}
                  alt="clock-icon"
                  width={16}
                  height={16}
                  className="translate-y-[1px]"
                />
              </div>
              <span className="flex h-full items-center text-sm">
                {format(new Date(gathering.scheduleStartDate), "hh:mm")}
              </span>
            </article>
          </div>
        </div>
        {/* 마감일, 좋아요, 조회수 */}
        <div className="flex flex-row items-center justify-between pt-[0.4375rem]">
          <div className="flex flex-row items-center gap-1">
            <Image
              src={`${gathering.isFinish || format(new Date(gathering.deadline), "yyyyMMdd") < format(new Date(), "yyyyMMdd") ? "/icons/pin-gray-icon.svg" : "/icons/pin-green-icon.svg"}`}
              alt="pin-icon"
              width={16}
              height={16}
            />

            <p className="text-sm">
              마감일:
              {format(new Date(gathering.deadline), "yy.MM.dd(EE)", {
                locale: ko,
              })}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              {
                /* eslint-disable indent */
                gathering.isFinish ||
                format(new Date(gathering.deadline), "yyyyMMdd") <
                  format(new Date(), "yyyyMMdd") ? (
                  <div className="flex items-center gap-1 text-sm">
                    <Image
                      src={"/icons/heart-gray-icon.svg"}
                      alt="heart-gray-icon"
                      width={16}
                      height={16}
                    />
                    {convertNumberToShortForm(gathering.likeCount)}
                  </div>
                ) : (
                  gatheringLikeComponent
                )
                /* eslint-enable indent */
              }
              <div className="relative flex items-center gap-1">
                <Image
                  src="/icons/eyes-icon.svg"
                  alt="eyes-icon"
                  width={16}
                  height={16}
                />
                <p className="text-sm">
                  {convertNumberToShortForm(gathering.viewCount)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
