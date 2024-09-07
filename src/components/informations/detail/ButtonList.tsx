import InformationDeleteModalContainer from "@/containers/informations/detail/InformationDeleteModalContainer";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

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
        className="flex flex-row items-center gap-1 text-sm text-gray1 hover:text-main dark:text-slate-400"
        href={`/informations/edit/${informationId}`}
      >
        <Image
          className="mt-[0.125rem]"
          src="/edit-icon.svg"
          alt="edit-icon"
          width={20}
          height={20}
        />
        수정
      </Link>
      <button
        className="flex flex-row items-center gap-1 text-sm text-gray1 hover:text-main dark:text-slate-400"
        onClick={() => setModalVisible(true)}
      >
        <Image
          src="/delete-icon.svg"
          alt="delete-icon"
          width={16}
          height={16}
        />
        삭제
      </button>
    </div>
  );
};

export default ButtonList;
