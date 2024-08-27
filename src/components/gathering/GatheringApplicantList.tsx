
interface IApplicant {
  userGatheringResponse: {
    profileUrl: string;
    nickname: string;
    age: number;
    sex: "male" | "female";
  };
  gatheringStatus: "WAIT" | "CONSENT" | "REFUSE";
}

interface IGatheringApplicantList {
  applicants: IApplicant[];
}

const GatheringApplicantList = (props: IGatheringApplicantList) => {
  return (
    <div className="mt-[3.625rem] flex w-full flex-col text-sm outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem]">
      <div className="flex w-full px-4 py-1 font-bold border-b-[1px] border-b-gray3">
        <div className="flex w-1/12 flex-col max-[600px]:text-xs items-center">
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
      {props.applicants.map((applicant, index) => (
        <div key={index} className="flex w-full items-center border-b p-4 ">
          <div className="w-1/12">
            <img
              src={applicant.userGatheringResponse.profileUrl}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>
          <div className="flex w-1/6 items-center justify-center">
            {applicant.userGatheringResponse.nickname}
          </div>
          <div className="flex w-1/6 items-center justify-center">
            {applicant.userGatheringResponse.age}년
          </div>
          <div className="flex w-1/6 items-center justify-center">
            {applicant.userGatheringResponse.sex === "male" ? "남성" : "여성"}
          </div>
          <div className="flex w-5/12 items-center justify-center space-x-2">
            <button
              className={`rounded-[2rem] h-[3.25rem]  w-[6.75rem] py-2 ${applicant.gatheringStatus === "CONSENT" ? "bg-main text-white" : "bg-white outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"}`}
            >
              승인
            </button>
            <button
              className={`rounded-[2rem] h-[3.25rem]  w-[6.75rem] py-2 ${applicant.gatheringStatus === "REFUSE" ? "bg-[#EE4C4A] text-white" : "bg-white outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"}`}
            >
              거절
            </button>
            <button
              className={`rounded-[2rem] h-[3.25rem]  w-[6.75rem] py-2 ${applicant.gatheringStatus === "WAIT" ? "bg-gray2 text-white" : "bg-white outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"}`}
            >
              대기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GatheringApplicantList;
