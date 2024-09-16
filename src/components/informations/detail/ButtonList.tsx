import DeleteIcon from "@/components/common/icons/DeleteIcon";
import EditIcon from "@/components/common/icons/EditIcon";
import InformationDeleteModalContainer from "@/containers/informations/detail/InformationDeleteModalContainer";
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
          closeModal={() => {
            window.history.back();
            setModalVisible(false);
          }}
        />
      )}
      <Link
        className="flex flex-row items-center gap-1 stroke-gray2 text-sm text-gray1 hover:stroke-main hover:text-main"
        href={`/informations/edit/${informationId}`}
      >
        <EditIcon />
        수정
      </Link>
      <button
        className="flex flex-row items-center gap-1 stroke-gray2 text-sm text-gray1 hover:stroke-main hover:text-main"
        onClick={() => setModalVisible(true)}
      >
        <DeleteIcon />
        삭제
      </button>
    </div>
  );
};

export default ButtonList;
