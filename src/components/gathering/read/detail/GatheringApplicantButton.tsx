import HashSpinner from "@/components/common/HashSpinner";
import useToastifyStore from "@/stores/toastifyStore";
import { gatheringApplicantsResponsesDto } from "@/types/GatheringDto";
import { useState } from "react";
interface IGatheringApplicantButton {
  applicant: gatheringApplicantsResponsesDto;
  isFullParticipants: boolean;
  updateGatheringApplicantStatusHandler: (
    status: "WAIT" | "CONSENT" | "REFUSE",
    userId: number,
  ) => void;
}
const GatheringApplicantButton = ({
  applicant,
  isFullParticipants,
  updateGatheringApplicantStatusHandler,
}: IGatheringApplicantButton) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toastifyStore = useToastifyStore();
  const toggleStatusHandler = () => {
    setIsStatusOpen((prev) => !prev);
  };

  if (loading) {
    return <HashSpinner loading={loading} />;
  }

  return (
    <div className={"h-full w-full"}>
      <article
        className={
          "flex h-full items-center justify-center gap-x-[.5rem] px-[.5rem] max-[576px]:hidden"
        }
      >
        {[
          {
            status: "CONSENT",
            style: "bg-main text-white",
            hoverStyle: "hover:bg-main hover:text-white",
            name: "승인",
          },
          {
            status: "REFUSE",
            style: "bg-[#EE4C4A] text-white",
            hoverStyle: "hover:bg-[#EE4C4A] hover:text-white",
            name: "거절",
          },
          {
            status: "WAIT",
            style: "bg-gray2 text-white",
            hoverStyle: "hover:bg-gray2 hover:text-white",
            name: "대기",
          },
        ].map((i, index) => (
          <button
            key={i.status + index}
            className={`aspect-square h-[3.25rem] rounded-[2rem] py-2 max-[576px]:h-[2.75rem] min-[800px]:w-full ${i.hoverStyle} ${applicant.gatheringStatus === i.status ? i.style : "bg-white outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"}`}
            disabled={applicant.gatheringStatus === i.status}
            onClick={async () => {
              if (isFullParticipants && i.status == "CONSENT") {
                toastifyStore.setToastify({
                  type: "warning",
                  message: "정원이 가득찼습니다.",
                });
                return;
              }
              setLoading(true);
              await updateGatheringApplicantStatusHandler(
                i.status as "WAIT" | "REFUSE" | "CONSENT",
                applicant.userGatheringResponse.id,
              );
              setLoading(false);
              setIsStatusOpen(false);
            }}
          >
            {i.name}
          </button>
        ))}
      </article>
      <article
        className={`flex h-full items-center justify-center gap-x-[.5rem] px-[.5rem] duration-1000 min-[577px]:hidden ${isStatusOpen ? "absolute right-0 bg-gray3/70" : "bg-transparent transition-transform"}`}
      >
        {[
          {
            status: "CONSENT",
            style: "bg-main text-white",
            hoverStyle: "hover:bg-main hover:text-white",
            name: "승인",
          },
          {
            status: "REFUSE",
            style: "bg-[#EE4C4A] text-white",
            hoverStyle: "hover:bg-[#EE4C4A] hover:text-white",
            name: "거절",
          },
          {
            status: "WAIT",
            style: "bg-gray2 text-white",
            hoverStyle: "hover:bg-gray2 hover:text-white",
            name: "대기",
          },
        ].map((i) => (
          <button
            key={i.status}
            className={`aspect-square h-[3.25rem] rounded-[2rem] max-[576px]:h-[2.75rem] min-[800px]:w-full ${
              applicant.gatheringStatus == i.status
                ? `${i.style} order-3`
                : `bg-white outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] ${i.hoverStyle} ${isStatusOpen ? "" : "max-[576px]:hidden"}`
            }`}
            onClick={async () => {
              // 모바일 너비에서 버튼이 1개라 여러 버튼을 보여주는 함수
              if (applicant.gatheringStatus === i.status) {
                toggleStatusHandler();
                return;
              }
              if (isFullParticipants && i.status == "CONSENT") {
                toastifyStore.setToastify({
                  type: "warning",
                  message: "정원이 가득찼습니다.",
                });
                return;
              }
              setLoading(true);
              // 실제 API 보내서 모임 상태 변경하는 함수
              await updateGatheringApplicantStatusHandler(
                i.status as "WAIT" | "REFUSE" | "CONSENT",
                applicant.userGatheringResponse.id,
              );
              setLoading(false);
              setIsStatusOpen(false);
            }}
          >
            {applicant.gatheringStatus === i.status && isStatusOpen ? (
              <div
                className={`relative flex h-full items-center justify-center rounded-[2rem] text-xl ${i.style} focus:border-0`}
              >
                <div className="relative h-6 w-6">
                  <span className="absolute left-0 top-1/2 block h-[0.1875rem] w-full -translate-y-1/2 rotate-45 transform bg-current"></span>
                  <span className="absolute left-0 top-1/2 block h-[0.1875rem] w-full -translate-y-1/2 -rotate-45 transform bg-current"></span>
                </div>
              </div>
            ) : (
              <span> {i.name} </span>
            )}
          </button>
        ))}
      </article>
    </div>
  );
};
export default GatheringApplicantButton;
