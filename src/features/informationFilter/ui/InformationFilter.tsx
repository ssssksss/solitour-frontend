"use client";

import { useModal } from "@/shared/lib/hooks";
import { InformationFilterModal } from "./InformationFilterModal";
import { Modal } from "@/shared/ui/modal";
import { VscSettings } from "react-icons/vsc";
import { useSearchParams } from "next/navigation";
import { LOCATION_NAME } from "@/shared/config";

export const InformationFilter = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const searchParams = useSearchParams();
  const zoneCategoryId = Number(searchParams.get("zoneCategoryId") ?? 0);

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <InformationFilterModal closeModal={closeModal} />
      </Modal>
      <button
        className={[
          zoneCategoryId === 0 ? "text-gray1" : "text-main",
          "hover:text-main flex flex-row items-center",
        ].join(" ")}
        onClick={openModal}
      >
        <VscSettings size="1.25rem" />
        <p className="text-sm text-nowrap">
          {zoneCategoryId === 0 ? "지역별" : LOCATION_NAME[zoneCategoryId]}
        </p>
      </button>
    </div>
  );
};
