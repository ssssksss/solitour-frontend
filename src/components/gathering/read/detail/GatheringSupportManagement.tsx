interface IGatheringSupportManagement {
  postUserId: number;
  userId: number;
  applyGathering: () => void;
  cancelGathering: () => void;
  gatheringStatus: string | null;
  removeGathering: () => void;
}
const GatheringSupportManagement = ({
  postUserId,
  userId,
  applyGathering,
  cancelGathering,
  gatheringStatus,
  removeGathering,
}: IGatheringSupportManagement) => {
  if (postUserId == userId && userId > 0) {
    return (
      <div className={"flex gap-2 max-[960px]:flex-col min-[960px]:flex-row"}>
        <button
          className={
            "h-[3.125rem] w-[7.5rem] rounded-[2.125rem] outline outline-[1px] outline-offset-[-1px] outline-gray3"
          }
        >
          채팅방 가기
        </button>
        <button
          onClick={removeGathering}
          className={
            "h-[3.125rem] w-[7.5rem] rounded-[2.125rem] text-sm outline outline-[1px] outline-offset-[-1px] outline-gray3"
          }
        >
          모임 마감하기
        </button>
      </div>
    );
  }
  if (postUserId != userId && userId > 0) {
    return (
      <div className={"flex gap-2 max-[960px]:flex-col min-[960px]:flex-row"}>
        {
          <button
            disabled={gatheringStatus != "CONSENT"}
            className={
              "h-[3.125rem] w-[7.5rem] rounded-[2.125rem] outline outline-[1px] outline-offset-[-1px] outline-gray3 disabled:bg-gray3"
            }
          >
            채팅방 열기
          </button>
        }
        {gatheringStatus == "REFUSE" && (
          <div
            className={
              "flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] bg-[#EE4C4A] text-white"
            }
          >
            신청 거부
          </div>
        )}
        {gatheringStatus == "WAIT" && (
          <button
            onClick={cancelGathering}
            className={
              "flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] bg-gray2 text-sm text-white"
            }
          >
            모임 신청중
          </button>
        )}
        {gatheringStatus == "CONSENT" && (
          <button
            onClick={cancelGathering}
            className={
              "flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] bg-main text-sm text-white outline outline-[1px] outline-offset-[-1px] outline-[#D9D9D9]"
            }
          >
            모임 승인 완료
          </button>
        )}
        {gatheringStatus == null && (
          <button
            onClick={applyGathering}
            className={
              "flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] text-sm outline outline-[1px] outline-offset-[-1px] outline-[#D9D9D9]"
            }
          >
            모임 신청하기
          </button>
        )}
      </div>
    );
  }
  return <></>;
};
export default GatheringSupportManagement