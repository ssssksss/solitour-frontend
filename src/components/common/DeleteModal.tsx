import HashSpinner from "./HashSpinner";

interface DeleteModalProps {
  loading: boolean;
  handleDeleteClick: () => void;
  handleCancelClick: () => void;
}

const DeleteModal = ({
  loading,
  handleDeleteClick,
  handleCancelClick,
}: DeleteModalProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <HashSpinner loading={loading} />
      <div className="flex h-fit max-h-[calc(100%_-_48px)] w-96 max-w-[calc(100%_-_48px)] flex-col items-center gap-6 overflow-y-auto rounded-xl bg-white p-6">
        <h1 className="text-3xl">정말 삭제하시겠습니까?</h1>
        <p className="text-gray1">삭제하시면 다시 복구할 수 없습니다.</p>
        <div className="flex flex-row gap-4">
          <button
            className="h-10 w-20 rounded-full bg-main text-white hover:scale-105"
            onClick={handleDeleteClick}
          >
            삭제
          </button>
          <button
            className="h-10 w-20 rounded-full bg-black text-white hover:scale-105"
            onClick={handleCancelClick}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
