import React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Gathering } from "@/entities/gathering";
import { convertNumberToShortForm } from "@/shared/lib/utils";
import { CATEGORY_TAG_STYLE } from "../config/categoryTagStyle";
import { STATUS_STYLE } from "../config/statusStyle";

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
      className={[
        gathering.isFinish ||
        format(new Date(gathering.deadline), "yyyyMMdd") <
          format(new Date(), "yyyyMMdd")
          ? "text-gray2"
          : "text-black",
        "outline-gray3 hover:bg-lightgreen hover:outline-main flex h-full max-h-[19.6875rem] w-full flex-col gap-5 rounded-2xl p-5 outline -outline-offset-2 duration-300",
      ].join(" ")}
      href={`/gathering/${gathering.gatheringId}`}
      onClick={(e) => {
        if (!isAccessGathering) {
          e.preventDefault();
        }
      }}
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <p
            className={[
              gathering.isFinish ||
              format(new Date(gathering.deadline), "yyyyMMdd") <
                format(new Date(), "yyyyMMdd")
                ? "bg-gray2 text-white"
                : gathering.gatheringStatus
                  ? STATUS_STYLE[gathering.gatheringStatus]
                  : CATEGORY_TAG_STYLE[gathering.gatheringCategoryName],
              "relative flex h-8 w-fit items-center rounded-full px-4 py-1.5 text-xs font-semibold outline -outline-offset-1",
            ].join(" ")}
          >
            <span>
              {gathering.gatheringStatus
                ? status[gathering.gatheringStatus]
                : gathering.gatheringCategoryName}
            </span>
          </p>
          {gatheringBookmarkComponent}
        </div>
        <p className="hover:text-main truncate pt-6 pb-1 text-lg font-bold">
          {gathering.title}
        </p>
        <p className="text-gray1 truncate text-sm font-medium">
          {gathering.nickname}
        </p>
      </div>
      <div className="flex w-full flex-col gap-2.5">
        <div className="flex flex-col gap-2.5">
          <div className="gap-2.5 text-sm font-semibold max-[432px]:flex max-[432px]:flex-col min-[432px]:grid min-[432px]:grid-cols-[auto_7rem] min-[744px]:flex min-[744px]:grid-cols-1 min-[744px]:flex-col-reverse">
            <article className="flex flex-row items-center gap-2">
              <Image
                src={
                  gathering.isFinish ||
                  format(new Date(gathering.deadline), "yyyyMMdd") <
                    format(new Date(), "yyyyMMdd")
                    ? "/icons/gathering-calendar-gray-icon.svg"
                    : "/icons/gathering-calendar-icon.svg"
                }
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
            <article className="flex h-5 items-center gap-2">
              <div className="flex items-center">
                <Image
                  src={
                    gathering.isFinish ||
                    format(new Date(gathering.deadline), "yyyyMMdd") <
                      format(new Date(), "yyyyMMdd")
                      ? "/icons/location-gray-icon.svg"
                      : "/icons/location-icon.svg"
                  }
                  alt="location-icon"
                  width={16}
                  height={16}
                />
              </div>
              <p className="truncate">
                {gathering.zoneCategoryParentName === "세종"
                  ? "세종특별자치시"
                  : `${gathering.zoneCategoryParentName}, ${gathering.zoneCategoryChildName}`}
              </p>
            </article>
          </div>
          <div className="gap-2.5 text-sm font-semibold max-[432px]:flex max-[432px]:flex-col-reverse min-[432px]:grid min-[432px]:grid-cols-[auto_7rem] min-[744px]:flex min-[744px]:grid-cols-1 min-[744px]:flex-col-reverse">
            <article className="flex h-5 w-full flex-row items-center gap-2">
              <div className="flex min-w-fit gap-2">
                <div className="relative flex items-center">
                  <Image
                    src={
                      gathering.isFinish ||
                      format(new Date(gathering.deadline), "yyyyMMdd") <
                        format(new Date(), "yyyyMMdd")
                        ? "/icons/people-gray-icon.svg"
                        : "/icons/people-icon.svg"
                    }
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
                    className={[
                      gathering.isFinish ||
                      format(new Date(gathering.deadline), "yyyyMMdd") <
                        format(new Date(), "yyyyMMdd")
                        ? "text-gray2"
                        : gathering.nowPersonCount / gathering.personCount > 0.5
                          ? "text-[#FC9F3A]"
                          : "text-main",
                      gathering.nowPersonCount === gathering.personCount &&
                        "text-[#ff0000]",
                    ].join(" ")}
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
            <article className="flex h-5 items-center gap-2 leading-[100%]">
              <div className="relative">
                <Image
                  className="translate-y-px"
                  src={
                    gathering.isFinish ||
                    format(new Date(gathering.deadline), "yyyyMMdd") <
                      format(new Date(), "yyyyMMdd")
                      ? "/icons/clock-gray-icon.svg"
                      : "/icons/clock-icon.svg"
                  }
                  alt="clock-icon"
                  width={16}
                  height={16}
                />
              </div>
              <span className="flex h-full items-center text-sm">
                {format(new Date(gathering.scheduleStartDate), "hh:mm")}
              </span>
            </article>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between pt-1.75">
          <div className="flex flex-row items-center gap-1">
            <Image
              src={
                gathering.isFinish ||
                format(new Date(gathering.deadline), "yyyyMMdd") <
                  format(new Date(), "yyyyMMdd")
                  ? "/icons/pin-gray-icon.svg"
                  : "/icons/pin-green-icon.svg"
              }
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
                      src="/icons/heart-gray-icon.svg"
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
