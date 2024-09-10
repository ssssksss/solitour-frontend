import HashSpinner from "../HashSpinner";

interface Props {
  loading: boolean;
  onConfirmClick: () => void;
  onCancelClick: () => void;
  mainMessage?: string[];
  subMessage?: string[];
}

const ConfirmModal = ({
  loading = false,
  onConfirmClick,
  onCancelClick,
  mainMessage,
  subMessage,
}: Props) => {
  return (
    <div className="relative flex h-full max-h-[340px] w-[calc(100vw-1rem)] max-w-[40rem] items-center justify-center overflow-y-scroll bg-white p-[1rem]">
      <HashSpinner loading={loading} />
      <div className="flex h-fit w-full flex-col items-center gap-6 rounded-xl bg-white p-6">
        <h1 className="text-3xl">
          {mainMessage
            ? mainMessage?.map((i) => <p key={i}> {i} </p>)
            : "승낙하시겠습니까?"}
        </h1>
        <div className="text-gray1">
          {subMessage?.map((i) => <p key={i}> {i} </p>)}
        </div>
        <div className="flex flex-row gap-4">
          <button
            className="h-10 w-20 rounded-full bg-main text-white hover:scale-105"
            onClick={() => onConfirmClick()}
          >
            확인
          </button>
          <button
            className="h-10 w-20 rounded-full bg-black text-white hover:scale-105"
            onClick={() => onCancelClick()}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
