import { IModalComponent } from "@/types/ModalState";
import ModalTemplate from "./ModalTemplate";
import { HashSpinner } from "@/shared/ui/hashSpinner";

interface IConfirmModal extends IModalComponent {
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
  ...props
}: IConfirmModal) => {
  return (
    <ModalTemplate className="max-h-[340px] w-[calc(100vw-1rem)] max-w-[40rem]">
      {props.closeButtonComponent}
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
    </ModalTemplate>
  );
};

export default ConfirmModal;
