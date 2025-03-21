import { ReactNode } from "react";
import { HashSpinner } from "@/shared/ui/hashSpinner";
import { ModalTemplate } from "./ModalTemplate";

interface ConfirmModalProps {
  loading: boolean;
  mainMessage?: string[];
  subMessage?: string[];
  onConfirmClick: () => void;
  onCancelClick: () => void;
  closeButtonComponent?: ReactNode;
}

export const ConfirmModal = ({
  loading = false,
  mainMessage,
  subMessage,
  onConfirmClick,
  onCancelClick,
  closeButtonComponent,
}: ConfirmModalProps) => {
  return (
    <ModalTemplate className="max-h-[340px] w-[calc(100vw-1rem)] max-w-[40rem]">
      {closeButtonComponent}
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
            className="bg-main h-10 w-20 rounded-full text-white hover:scale-105"
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
