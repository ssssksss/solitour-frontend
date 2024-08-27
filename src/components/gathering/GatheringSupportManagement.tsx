interface IGatheringSupportManagement {
  postUserId: number;
  userId: number;
  applyGathering: () => void;
  cancelGathering: () => void;
}
const GatheringSupportManagement = ({
  postUserId,
  userId,
  applyGathering,
  cancelGathering,
}: IGatheringSupportManagement) => {
  if (postUserId != userId && userId > 0) {
    return (
      <div className={"flex flex-col"}>
        {/* <div
          className={
            "flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] bg-[#EE4C4A] text-white"
          }
        >
          신청 거부
        </div>
        <button
          onClick={cancelGathering}
          className={
            "flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] bg-gray2 text-white"
          }
        >
          모임 신청중
        </button>
        */}
        {/* <button
          onClick={cancelGathering}
          className={
            "flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] outline outline-[1px] outline-offset-[-1px] outline-[#D9D9D9]"
          }
        >
          신청 완료
        </button>  */}
        <button
          onClick={applyGathering}
          className={
            "flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] outline outline-[1px] outline-offset-[-1px] outline-[#D9D9D9]"
          }
        >
          모임 신청하기
        </button>
      </div>
    );
  }
  return <></>;
};
export default GatheringSupportManagement