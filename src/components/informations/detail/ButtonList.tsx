import InformationDeleteModalContainer from "@/containers/informations/detail/InformationDeleteModalContainer";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";

interface Props {
  visible: boolean;
  informationId: number;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const ButtonList = ({
  visible,
  informationId,
  modalVisible,
  setModalVisible,
}: Props) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-row items-center justify-end gap-3">
      {modalVisible && (
        <InformationDeleteModalContainer
          informationId={informationId}
          closeModal={() => setModalVisible(false)}
        />
      )}
      <Link
        className="flex flex-row items-center gap-1 text-sm hover:text-main dark:text-slate-400"
        href={`/informations/edit/${informationId}`}
      >
        <GoPencil />
        수정
      </Link>
      <button
        className="flex flex-row items-center gap-1 text-sm hover:text-main dark:text-slate-400"
        onClick={() => setModalVisible(true)}
      >
        <FaRegTrashCan />
        삭제
      </button>
    </div>
  );
};

export default ButtonList;
