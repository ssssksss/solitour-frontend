import HashSpinner from "./HashSpinner";

interface Props {
  loading: boolean;
  onRemoveClick: () => void;
  onCancelClick: () => void;
  mainMessage?: string[];
  subMessage?: string[];
}

const RemoveModal = ({
  loading,
  onRemoveClick,
  onCancelClick,
  mainMessage,
  subMessage,
}: Props) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <HashSpinner loading={loading} />
      <div className="flex h-fit w-96 flex-col items-center gap-6 rounded-xl bg-white p-6 dark:bg-slate-800">
        <h1 className="text-3xl">
          {
            mainMessage ?
              mainMessage?.map((i) => <p> {i} </p>) :
            "정말 제거하시겠습니까?"
         }
        </h1>
        <div className="text-gray1">{subMessage?.map((i) => <p> {i} </p>)}</div>
        <div className="flex flex-row gap-4">
          <button
            className="h-10 w-20 select-none rounded-full bg-main text-white hover:scale-105"
            onClick={() => onRemoveClick()}
          >
            삭제
          </button>
          <button
            className="h-10 w-20 select-none rounded-full bg-black text-white hover:scale-105"
            onClick={() => onCancelClick()}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveModal;

