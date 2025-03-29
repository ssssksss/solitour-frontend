"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { GENDER, UserImage } from "@/entities/user";
import { useGatheringViewer } from "../model/useGatheringViewer";
import { GatheringViewerButtonList } from "./GatheringViewerButtonList";
import { convertNumberToShortForm } from "@/shared/lib/utils";
import { GatheringSupportManagement } from "./GatheringSupportManagement";
import { GatheringApplicantList } from "./GatheringApplicantList";
import { GatheringLike } from "@/features/gatheringLike";
import { GatheringRecommendationList } from "./GatheringRecommendationList";
import { GatheringDetail } from "@/entities/gathering";
import { KakaoMapLink } from "@/shared/ui/kakaoMapLink";

interface GatheringViewerProps {
  gatheringDetail: GatheringDetail;
  gatheringId: number;
}

export const GatheringViewer = ({
  gatheringDetail,
  gatheringId,
}: GatheringViewerProps) => {
  const { currentParticipants } = useGatheringViewer(gatheringDetail);

  return (
    <div className="w-full">
      <div className="flex w-full max-w-[60rem] flex-col">
        {/* 제목 부분 */}
        <article className="w-full px-1 pb-9">
          {/* 제목, 신청 버튼 */}
          <div className="grid w-full items-start gap-4 max-[960px]:grid-cols-[calc(100%-8.5rem)_8.5rem] min-[960px]:grid-cols-[calc(100%-14.5rem)_14.5rem]">
            <h1 className="text-3xl font-semibold break-words whitespace-pre-wrap">
              {gatheringDetail.title}
            </h1>
            <GatheringSupportManagement
              postUserId={gatheringDetail.userPostingResponse.id}
              initialGatheringStatus={gatheringDetail.gatheringStatus}
              initialIsFinished={gatheringDetail.isFinish}
              openChattingUrl={gatheringDetail.openChattingUrl}
              allowedGender={gatheringDetail.allowedSex}
              allowedAgeRange={{
                startAge: gatheringDetail.startAge,
                endAge: gatheringDetail.endAge,
              }}
            />
          </div>
          {/* 프로필 이미지, 닉네임, 좋아요, 조회수 */}
          <div className="mt-[0.375rem] flex w-full justify-between pt-[1rem]">
            <div className="flex items-center gap-x-3">
              <UserImage
                userImageAddress={gatheringDetail.userImage}
                size={52}
              />
              <div className="flex flex-col gap-y-[0.125rem]">
                <div className="text-xs font-semibold text-black">
                  {gatheringDetail.userPostingResponse?.nickname}
                </div>
                <div className="text-gray1 w-fit shrink-0 text-xs whitespace-nowrap">
                  {format(new Date(gatheringDetail.createdAt), "yyyy-MM-dd")}
                </div>
              </div>
            </div>
            <div className="text-gray2 flex w-full items-end justify-end text-xs font-medium">
              <div className="flex flex-row items-center space-x-3">
                <div className="text-gray2 mb-1 flex flex-row items-center gap-2">
                  <GatheringLike
                    gatheringId={gatheringId}
                    initialLikeCount={gatheringDetail.likeCount}
                    initialIsLike={gatheringDetail.isLike}
                  />
                  <div className="text-gray2 flex items-center gap-1 text-sm">
                    <Image
                      src="/icons/eyes-icon.svg"
                      alt="eyes-icon"
                      width={16}
                      height={16}
                    />
                    <p>{convertNumberToShortForm(gatheringDetail.viewCount)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        {/* 제한 부분(날짜, 장소, 인원, 시간) */}
        <article className="grid grid-cols-1 gap-y-4 border-y-[1px] border-[#d9d9d9] p-[1.25rem] text-sm min-[800px]:grid-cols-2 sm:grid-cols-[320px_auto]">
          <div className="flex gap-x-3">
            <Image
              src="/icons/gathering-calendar-icon.svg"
              alt="gathering-calendar-icon"
              width={14}
              height={14}
            />
            <div>
              {format(
                new Date(gatheringDetail.scheduleStartDate),
                "yyyy.MM.dd HH:mm (EE) ~ ",
                { locale: ko },
              )}
              {gatheringDetail.scheduleEndDate &&
                format(
                  new Date(gatheringDetail.scheduleEndDate),
                  "yyyy.MM.dd HH:mm (EE)",
                  {
                    locale: ko,
                  },
                )}
            </div>
          </div>
          <div className="flex gap-x-3">
            <Image
              src="/icons/location-icon.svg"
              alt="location-icon"
              width={14}
              height={14}
            />
            <div>
              {gatheringDetail.zoneCategoryResponse.parentZoneCategory?.name ==
              "세종"
                ? "세종특별자치시"
                : `${gatheringDetail.zoneCategoryResponse.parentZoneCategory?.name}, ${gatheringDetail.zoneCategoryResponse.name}
            `}
            </div>
          </div>
          <div className="flex gap-x-3">
            <Image
              src="/icons/people-icon.svg"
              alt="people-icon-image"
              width={14}
              height={14}
            />
            <div>
              <span
                className={
                  gatheringDetail.personCount == currentParticipants
                    ? "text-[#ff0000]"
                    : ""
                }
              >
                <span
                  className={
                    gatheringDetail.personCount == currentParticipants
                      ? "text-[#ff0000]"
                      : gatheringDetail.nowPersonCount /
                            gatheringDetail.personCount >
                          0.5
                        ? "text-[#FC9F3A]"
                        : "text-main"
                  }
                >
                  {currentParticipants || gatheringDetail.nowPersonCount}
                </span>
                {" /"} {gatheringDetail.personCount}
              </span>
              <span className="text-gray2">
                {" (" +
                  (new Date().getFullYear() - gatheringDetail.startAge) +
                  "세 ~ " +
                  (new Date().getFullYear() - gatheringDetail.endAge) +
                  "세, " +
                  GENDER[gatheringDetail.allowedSex] +
                  ")"}
              </span>
            </div>
          </div>
          <div className="flex gap-x-3">
            <Image
              src="/icons/clock-icon.svg"
              alt="clock-icon-image"
              width={14}
              height={14}
            />
            <div>
              {" "}
              {format(
                new Date(gatheringDetail.scheduleStartDate),
                "HH:mm",
              )}{" "}
            </div>
          </div>
        </article>
        {/* 내용 부분 */}
        <div className="text-gray1 my-[1rem] flex gap-1">
          <Image
            src="/icons/pin-green-icon.svg"
            alt="pin-green-icon"
            width={14}
            height={14}
          />
          {format(
            new Date(gatheringDetail.deadline),
            "모집 마감일 : yyyy-MM-dd HH:mm(EE) 까지",
            {
              locale: ko,
            },
          )}
        </div>
        <div className="mb-5 w-full pt-8 break-words whitespace-pre-wrap">
          {gatheringDetail.content}
        </div>
        {gatheringDetail.tagResponses?.length > 0 && (
          <div className="mb-10.5 flex flex-wrap gap-1">
            {gatheringDetail.tagResponses?.map((i) => (
              <div
                key={i.name}
                className="text-main outline-main max-w-max rounded-2xl px-2 py-1 text-sm outline -outline-offset-1"
              >
                {"#"}
                {i.name}
              </div>
            ))}
          </div>
        )}
        {/* 지도 부분 */}
        <KakaoMapLink
          placeName={gatheringDetail.placeResponse.name}
          placeAddress={gatheringDetail.placeResponse.address}
          placeId={Number(gatheringDetail.placeResponse.searchId)}
          placeYAxis={gatheringDetail.placeResponse.yaxis}
          placeXAxis={gatheringDetail.placeResponse.xaxis}
        />
        <GatheringApplicantList
          postUserId={gatheringDetail.userPostingResponse.id}
        />
        <GatheringViewerButtonList
          userId={gatheringDetail.userPostingResponse.id}
          gatheringId={gatheringId}
        />
      </div>
      <GatheringRecommendationList data={gatheringDetail.gatheringRecommend} />
    </div>
  );
};
