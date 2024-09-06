
interface IApplicant {
  userGatheringResponse: {
    profileUrl: string;
    nickname: string;
    age: number;
    sex: "male" | "female";
    id: number;
  };
  gatheringStatus: "WAIT" | "CONSENT" | "REFUSE";
}

interface IGatheringApplicantList {
  applicants: IApplicant[];
  updateGatheringApplicantStatus: (
    status: "WAIT" | "CONSENT" | "REFUSE",
    userId: number,
  ) => void;
}

const GatheringApplicantList = (props: IGatheringApplicantList) => {
  return (
    <div className="mt-[3.625rem] flex max-h-[28.5rem] w-full flex-col rounded-[1rem] text-sm outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]">
      <div className="flex h-[3.5rem] w-full border-b-[1px] border-b-gray3 px-4 py-1 font-bold">
        <div className="flex w-1/12 flex-col items-center justify-center max-[600px]:text-xs">
          <span> 프로필 </span>
          <span> 이미지 </span>
        </div>
        <div className="flex w-1/6 items-center justify-center">닉네임</div>
        <div className="flex w-1/6 items-center justify-center">나이</div>
        <div className="flex w-1/6 items-center justify-center">성별</div>
        <div className="flex w-5/12 items-center justify-center">
          모임 신청 상태
        </div>
      </div>
      <div className="max-h-[25rem] overflow-y-scroll">
        {props.applicants.map((applicant, index) => (
          <div
            key={index}
            className="flex h-[5rem] w-full items-start border-b p-4"
          >
            <div className="flex w-1/12 items-center justify-center">
              <img
                src={applicant.userGatheringResponse.profileUrl}
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <div className="flex h-full w-1/6 items-center justify-center">
              {applicant.userGatheringResponse.nickname}
            </div>
            <div className="flex h-full w-1/6 flex-col items-center justify-center">
              <span> {applicant.userGatheringResponse.age}년 </span>
              <span>
                {"("}
                {new Date().getFullYear() - applicant.userGatheringResponse.age}
                살{")"}
              </span>
            </div>
            <div className="flex h-full w-1/6 items-center justify-center">
              {applicant.userGatheringResponse.sex === "male" ? "남성" : "여성"}
            </div>
            <div className="flex w-5/12 items-center justify-center space-x-2">
              <button
                className={`h-[3.25rem] w-[6.75rem] rounded-[2rem] py-2 ${applicant.gatheringStatus === "CONSENT" ? "bg-main text-white" : "bg-white outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"}`}
                onClick={() =>
                  props.updateGatheringApplicantStatus(
                    "CONSENT",
                    applicant.userGatheringResponse.id,
                  )
                }
              >
                승인
              </button>
              <button
                className={`h-[3.25rem] w-[6.75rem] rounded-[2rem] py-2 ${applicant.gatheringStatus === "REFUSE" ? "bg-[#EE4C4A] text-white" : "bg-white outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"}`}
                onClick={() =>
                  props.updateGatheringApplicantStatus(
                    "REFUSE",
                    applicant.userGatheringResponse.id,
                  )
                }
              >
                거절
              </button>
              <button
                className={`h-[3.25rem] w-[6.75rem] rounded-[2rem] py-2 ${applicant.gatheringStatus === "WAIT" ? "bg-gray2 text-white" : "bg-white outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"}`}
                onClick={() =>
                  props.updateGatheringApplicantStatus(
                    "WAIT",
                    applicant.userGatheringResponse.id,
                  )
                }
              >
                대기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GatheringApplicantList;
