import Link from "next/link";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";

interface Props {
  visible: boolean;
  informationId: number;
  onDeleteClick: () => void;
}

const ButtonList = ({ visible, informationId, onDeleteClick }: Props) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-row items-center justify-end gap-3">
      <Link
        className="flex flex-row items-center gap-1 text-sm hover:text-main dark:text-slate-400"
        href={`/informations/edit/${informationId}`}
      >
        <GoPencil />
        수정
      </Link>
      <button
        className="flex flex-row items-center gap-1 text-sm hover:text-main dark:text-slate-400"
        onClick={() => onDeleteClick()}
      >
        <FaRegTrashCan />
        삭제
      </button>
    </div>
  );
};

export default ButtonList;
