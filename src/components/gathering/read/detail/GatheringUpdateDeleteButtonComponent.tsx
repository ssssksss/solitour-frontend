"use client";

import DeleteIcon from "@/components/common/icons/DeleteIcon";
import EditIcon from "@/components/common/icons/EditIcon";
// 모임이나 정보에서 수정, 삭제를 담고 있는 컴포넌트

import useAuthStore from "@/store/authStore";
import Link from "next/link";

interface IGatheringUpdateDeleteButtonComponent {
  userId: number;
  updateHref: string;
  deleteHandler: () => void;
}
const GatheringUpdateDeleteButtonComponent = ({
  userId,
  updateHref,
  deleteHandler,
}: IGatheringUpdateDeleteButtonComponent) => {
  const authStore = useAuthStore();
  return (
    <>
      {authStore.id == userId && authStore.id > 0 && (
        <div className="mt-6 flex w-full flex-row items-center justify-end gap-3 text-sm">
          <Link
            className="flex flex-row items-center gap-1 stroke-gray2 hover:stroke-main hover:text-main"
            href={updateHref}
          >
            <EditIcon />
            수정
          </Link>
          <button
            className="flex flex-row items-center gap-1 fill-gray2 stroke-gray2 hover:fill-main hover:stroke-main hover:text-main"
            onClick={() => deleteHandler()}
          >
            <DeleteIcon className="fill-inherit" />
            삭제
          </button>
        </div>
      )}
    </>
  );
};
export default GatheringUpdateDeleteButtonComponent;
