"use client";

import { useUserStore } from "@/entities/user";
import { DeleteIcon, EditIcon } from "@/shared/ui/icon";
import Link from "next/link";

interface GatheringUpdateDeleteButtonComponentProps {
  userId: number;
  updateHref: string;
  deleteHandler: () => void;
}

const GatheringUpdateDeleteButtonComponent = ({
  userId,
  updateHref,
  deleteHandler,
}: GatheringUpdateDeleteButtonComponentProps) => {
  const userStore = useUserStore();

  return (
    <>
      {userStore.id == userId && userStore.id > 0 && (
        <div className="mt-6 flex w-full flex-row items-center justify-end gap-3 text-sm">
          <Link
            className="stroke-gray2 hover:stroke-main hover:text-main flex flex-row items-center gap-1"
            href={updateHref}
          >
            <EditIcon />
            수정
          </Link>
          <button
            className="fill-gray2 stroke-gray2 hover:fill-main hover:stroke-main hover:text-main flex flex-row items-center gap-1"
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
