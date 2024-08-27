import HashSpinner from "./HashSpinner";

interface Props {
  loading: boolean;
  onDeleteClick: () => void;
  onCancelClick: () => void;
}

const DeleteModal = ({ loading, onDeleteClick, onCancelClick }: Props) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <HashSpinner loading={loading} />
      <div className="flex h-fit w-96 flex-col items-center gap-6 rounded-xl bg-white p-6 dark:bg-slate-800">
        <h1 className="text-3xl">정말 삭제하시겠습니까?</h1>
        <p className="text-gray1">삭제하시면 다시 복구할 수 없습니다.</p>
        <div className="flex flex-row gap-4">
          <button
            className="h-10 w-20 rounded-full bg-main text-white hover:scale-105"
            onClick={() => onDeleteClick()}
          >
            삭제
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

export default DeleteModal;
