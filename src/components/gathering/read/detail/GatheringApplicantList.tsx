import UserImage from "@/components/auth/UserImage";
import { gatheringApplicantsResponsesDto } from "@/types/GatheringDto";
import Image from "next/image";
import GatheringApplicantButton from "./GatheringApplicantButton";

interface IGatheringApplicantList {
  gatheringApplicantsResponses: gatheringApplicantsResponsesDto[];
  updateGatheringApplicantStatusHandler: (
    status: "WAIT" | "CONSENT" | "REFUSE",
    userId: number,
  ) => void;
  isFullParticipants: boolean;
  sort: string;
  sortHandler: (value: string) => void;
  setIsSortOpen: (value: boolean) => void;
  isSortOpen: boolean;
  isFinish: boolean;
}

const GatheringApplicantList = ({
  gatheringApplicantsResponses,
  updateGatheringApplicantStatusHandler,
  isFullParticipants,
  sort,
  sortHandler,
  setIsSortOpen,
  isSortOpen,
  isFinish,
}: IGatheringApplicantList) => {
  return (
    <div className="mt-[3.625rem] flex h-auto w-full flex-col rounded-[1rem] text-sm outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]">
      <div
        className={`grid h-[4.5rem] w-full border-b-[1px] border-b-gray3 py-1 font-bold ${isFinish ? "grid-cols-[80px_auto_40px_40px] min-[577px]:grid-cols-[80px_auto_80px_80px] min-[800px]:grid-cols-[120px_auto_120px_120px]" : "max-[576px]:grid-cols-[80px_auto_40px_40px_60px] min-[577px]:grid-cols-[80px_auto_40px_40px_200px] min-[800px]:grid-cols-[80px_260px_80px_80px_auto]"}`}
      >
        <div className="flex flex-col items-center justify-center max-[600px]:text-xs">
          <span> 프로필 </span>
          <span> 이미지 </span>
        </div>
        <div className="flex items-center justify-center">닉네임</div>
        <div className="flex items-center justify-center">나이</div>
        <div className="flex items-center justify-center">성별</div>
        {!isFinish && (
          <button
            className="relative flex items-center justify-center"
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            <div className={"flex gap-x-2"}>
              상태
              <Image
                src="/icons/dropdown-down-arrow.svg"
                className="translate-y-[0.125rem]"
                alt="dropdown-down-arrow"
                width={12}
                height={6}
              />
            </div>
            {isSortOpen && (
              <ul className="absolute bottom-[-8.25rem] z-10 flex w-full flex-col bg-white outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]">
                {[
                  { label: "전체", value: "" },
                  { label: "승인", value: "CONSENT" },
                  { label: "거절", value: "REFUSE" },
                  { label: "대기", value: "WAIT" },
                ].map((option, index) => (
                  <li
                    key={index}
                    className={"h-[2rem] hover:bg-gray3 hover:text-main"}
                  >
                    <button
                      className={"h-full w-full"}
                      onClick={(e) => {
                        e.preventDefault();
                        sortHandler(option.value);
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </button>
        )}
      </div>
      {gatheringApplicantsResponses.length < 1 ? (
        <div className="flex h-[4rem] w-full items-center justify-center text-lg">
          지원자가 없습니다.
        </div>
      ) : (
        <div className="scrollbar-hide max-h-[25rem] overflow-y-scroll">
          {gatheringApplicantsResponses
            .filter((i) => {
              if (isFinish) return i.gatheringStatus == "CONSENT";
              if (sort == "") return true;
              if (i.gatheringStatus == sort) return true;
            })
            .map((applicant, index) => (
              <div
                key={index}
                className={`relative grid w-full items-start ${gatheringApplicantsResponses.length - 1 != index && "border-b"} ${isFinish ? "grid-cols-[80px_auto_40px_40px] min-[577px]:grid-cols-[80px_auto_80px_80px] min-[800px]:grid-cols-[120px_auto_120px_120px]" : "max-[576px]:grid-cols-[80px_auto_40px_40px_60px] min-[577px]:grid-cols-[80px_auto_40px_40px_200px] min-[800px]:grid-cols-[80px_260px_80px_80px_auto]"}`}
              >
                <div className="flex h-full items-center justify-center py-4">
                  <UserImage
                    userImageAddress={
                      applicant.userGatheringResponse.profileUrl
                    }
                    size={48}
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center py-4 text-center">
                  {applicant.userGatheringResponse.nickname}
                </div>
                <div className="flex h-full flex-col items-center justify-center py-4">
                  {/* <span> {applicant.userGatheringResponse.age}년 </span> */}
                  <span>
                    {`${new Date().getFullYear() - applicant.userGatheringResponse.age}`}
                  </span>
                </div>
                <div className="flex h-full items-center justify-center py-4">
                  {applicant.userGatheringResponse.sex === "male" ? "남" : "여"}
                </div>
                {!isFinish && (
                  <GatheringApplicantButton
                    applicant={applicant}
                    isFullParticipants={isFullParticipants}
                    updateGatheringApplicantStatusHandler={
                      updateGatheringApplicantStatusHandler
                    }
                  />
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default GatheringApplicantList;
