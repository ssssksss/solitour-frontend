import UserImage from "@/components/auth/UserImage";
import { SETTING_MODAL_SEX } from "@/constants/gathering/GatheringConstant";
import GatheringApplicantListContainer from "@/containers/gathering/read/detail/GatheringApplicantListContainer";
import GatheringSupportManagementContainer from "@/containers/gathering/read/detail/GatheringSupportManagementContainer";
import { GatheringDetailResponseDto } from "@/types/GatheringDto";
import { ModalState } from "@/types/ModalState";
import { convertNumberToShortForm } from "@/utils/convertNumberToShortForm";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import GatheringDeleteModalContainer from "../../../../containers/gathering/read/detail/GatheringDeleteModalContainer";
import GatheringLike from "../../../../containers/gathering/read/GatheringLikeContainer";
import GatheringKakaoMap from "../GatheringKakaoMap";
import GatheringUpdateDeleteButtonComponent from "./GatheringUpdateDeleteButtonComponent";

interface IGatheringViewer {
  data: GatheringDetailResponseDto;
  postId: number;
  modalState: ModalState;
  currentParticipants: number;
}

const GatheringViewer = ({
  data,
  postId,
  modalState,
  currentParticipants,
}: IGatheringViewer) => {
  return (
    <div className={"flex w-full max-w-[60rem] flex-col"}>
      {modalState.isOpen && (
        <GatheringDeleteModalContainer
          closeModal={() => modalState.closeModal()}
        />
      )}
      {/* 제목 부분 */}
      <article className="w-full px-[.25rem] pb-[2.25rem]">
        {/* 제목, 신청 버튼 */}
        <div className="grid w-full items-start gap-4 max-[960px]:grid-cols-[calc(100%-8.5rem)_8.5rem] min-[960px]:grid-cols-[calc(100%-14.5rem)_14.5rem]">
          <h1 className="whitespace-pre-wrap break-words text-3xl font-semibold">
            {data.title}
          </h1>
          <GatheringSupportManagementContainer
            postUserId={data.userPostingResponse.id}
            gatheringStatus={data.gatheringStatus}
            isFinish={data.isFinish}
            openChattingUrl={data.openChattingUrl}
          />
        </div>
        {/* 프로필 이미지, 닉네임, 좋아요, 조회수 */}
        <div className="mt-[0.375rem] flex w-full justify-between pt-[1rem]">
          <div className={"flex items-center gap-x-3"}>
            <UserImage userImageAddress={data.userImage} size={52} />
            <div className="flex flex-col gap-y-[0.125rem]">
              <div className="text-xs font-semibold text-black">
                {data.userPostingResponse?.nickname}
              </div>
              <div className="w-fit flex-shrink-0 whitespace-nowrap text-xs text-gray1">
                {format(new Date(data.createdAt), "yyyy-MM-dd")}
              </div>
            </div>
          </div>
          <div className="flex w-full items-end justify-end text-xs font-medium text-gray2">
            <div className="flex flex-row items-center space-x-3">
              <div className="mb-[.25rem] flex flex-row items-center gap-2 text-gray2">
                <GatheringLike
                  likes={data.likeCount}
                  isLike={data.isLike}
                  gatheringId={postId}
                />
                <div className="flex items-center gap-1 text-sm text-gray2">
                  <Image
                    src="/common/eyes-icon.svg"
                    alt="eyes-icon"
                    width={16}
                    height={16}
                  />
                  <p>{convertNumberToShortForm(data.viewCount)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      {/* 제한 부분(날짜, 장소, 인원, 시간) */}
      <article className="grid grid-cols-1 gap-y-[1rem] border-y-[1px] border-[#d9d9d9] p-[1.25rem] text-sm sm:grid-cols-[320px_auto] min-[800px]:grid-cols-2">
        <div className="flex gap-x-3">
          <Image
            src={"/gathering/calendar-icon.svg"}
            alt={"calendar-icon-image"}
            width={14}
            height={14}
          />
          <div>
            {format(
              new Date(data.scheduleStartDate),
              "yyyy.MM.dd HH:mm (EE) ~ ",
              { locale: ko },
            )}
            {data.scheduleEndDate &&
              format(new Date(data.scheduleEndDate), "yyyy.MM.dd HH:mm (EE)", {
                locale: ko,
              })}
          </div>
        </div>
        <div className="flex gap-x-3">
          <Image
            src={"/gathering/location-icon.svg"}
            alt={"location-icon-image"}
            width={14}
            height={14}
          />
          <div>
            {data.zoneCategoryResponse.parentZoneCategory?.name == "세종"
              ? "세종특별자치시"
              : `${data.zoneCategoryResponse.parentZoneCategory?.name}, ${data.zoneCategoryResponse.name}
            `}
          </div>
        </div>
        <div className="flex gap-x-3">
          <Image
            src="/gathering/people-icon.svg"
            alt={"people-icon-image"}
            width={14}
            height={14}
          />
          <div>
            <span
              className={`${data.personCount == currentParticipants && "text-[#ff0000]"}`}
            >
              <span
                className={`${data.personCount == currentParticipants ? "text-[#ff0000]" : data.nowPersonCount / data.personCount > 0.5 ? "text-[#FC9F3A]" : "text-main"}`}
              >
                {currentParticipants || data.nowPersonCount}
              </span>
              {" /"} {data.personCount}
            </span>
            <span className="text-gray2">
              {" (" +
                (new Date().getFullYear() - data.startAge) +
                "세 ~ " +
                (new Date().getFullYear() - data.endAge) +
                "세, " +
                SETTING_MODAL_SEX[data.allowedSex] +
                ")"}
            </span>
          </div>
        </div>
        <div className="flex gap-x-3">
          <Image
            src={"/gathering/clock-icon.svg"}
            alt={"clock-icon-image"}
            width={14}
            height={14}
          />
          <div> {format(new Date(data.scheduleStartDate), "HH:mm")} </div>
        </div>
      </article>
      {/* 내용 부분 */}
      <div className={"my-[1rem] flex gap-1 text-gray1"}>
        <Image
          src={"/gathering/green_pin.svg"}
          alt={"clock-icon-image"}
          width={14}
          height={14}
        />
        {format(
          new Date(data.deadline),
          "모집 마감일 : yyyy-MM-dd HH:mm(EE) 까지",
          {
            locale: ko,
          },
        )}
      </div>
      <div className="mb-[1.25rem] w-full whitespace-pre-wrap break-words pt-[2rem]">
        {data.content}
      </div>
      {data.tagResponses?.length > 0 && (
        <div className={"mb-[2.625rem] flex flex-wrap gap-[.25rem]"}>
          {data.tagResponses?.map((i) => (
            <div
              key={i.name}
              className="max-w-max rounded-2xl px-[.5rem] py-[.25rem] text-main outline outline-[1px] outline-offset-[-1px] outline-main"
            >
              {"#"}
              {i.name}
            </div>
          ))}
        </div>
      )}
      {/* 지도 부분 */}
      <GatheringKakaoMap {...data.placeResponse} />
      <GatheringApplicantListContainer
        postUserId={data.userPostingResponse.id}
      />
      <GatheringUpdateDeleteButtonComponent
        userId={data.userPostingResponse.id}
        updateHref={`/gathering/edit/${postId}`}
        deleteHandler={() => modalState.openModal()}
      />
    </div>
  );
};
export default GatheringViewer;
