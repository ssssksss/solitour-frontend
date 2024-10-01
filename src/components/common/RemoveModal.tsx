import { MdClose } from "react-icons/md";
import HashSpinner from "./HashSpinner";
import ModalTemplate from "./modal/ModalTemplate";

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
    <ModalTemplate className="w-full max-w-[28rem] max-h-[20rem]">
      <button
        onClick={() => onCancelClick()}
        className="absolute top-[2rem] right-[2rem] h-[2rem] w-[2rem] scale-100 transform transition-transform duration-300"
        style={{ zIndex: 200 }}
      >
        <MdClose
          className="cursor-pointer text-gray2 hover:text-main bg-red-60"
          size={"2.5rem"}
          onClick={() => {
            onCancelClick();
          }}
        />
      </button>
      <HashSpinner loading={loading} />
      <div className="flex h-fit w-96 flex-col justify-center items-center gap-6 rounded-xl bg-white p-6">
        <h1 className="text-3xl">
          {mainMessage
            ? mainMessage?.map((i) => <p key={i}> {i} </p>)
            : "정말 제거하시겠습니까?"}
        </h1>
        <div className="text-gray1">
          {subMessage?.map((i) => <p key={i}> {i} </p>)}
        </div>
        <div className="flex flex-row gap-4">
          <button
            className="h-10 px-8 select-none rounded-full bg-main text-white hover:scale-105"
            onClick={() => onRemoveClick()}
          >
            삭제
          </button>
          <button
            className="h-10 px-8 select-none rounded-full bg-black text-white hover:scale-105"
            onClick={() => onCancelClick()}
          >
            취소
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
};

export default RemoveModal;
