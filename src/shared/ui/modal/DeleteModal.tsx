import { HashSpinner } from "../hashSpinner";
import { ModalTemplate } from "./ModalTemplate";

interface DeleteModalProps {
  loading: boolean;
  onDeleteClick: () => void;
  onCancelClick: () => void;
}

export const DeleteModal = ({
  loading,
  onDeleteClick,
  onCancelClick,
}: DeleteModalProps) => {
  return (
    <ModalTemplate
      className="w-96 max-w-[calc(100%_-_48px)] gap-6 p-6"
      closeModal={onCancelClick}
    >
      <HashSpinner loading={loading} />
      <h1 className="text-3xl">정말 삭제하시겠습니까?</h1>
      <p className="text-gray1">삭제하시면 다시 복구할 수 없습니다.</p>
      <div className="flex flex-row gap-4">
        <button
          className="bg-main h-10 w-20 rounded-full text-white hover:scale-105"
          onClick={onDeleteClick}
        >
          삭제
        </button>
        <button
          className="h-10 w-20 rounded-full bg-black text-white hover:scale-105"
          onClick={onCancelClick}
        >
          취소
        </button>
      </div>
    </ModalTemplate>
  );
};
