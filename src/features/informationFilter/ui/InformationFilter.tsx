"use client";

import { useModal } from "@/shared/lib/hooks";
import { InformationFilterModal } from "./InformationFilterModal";
import { Modal } from "@/shared/ui/modal";
import { VscSettings } from "react-icons/vsc";
import { useSearchParams } from "next/navigation";

export const InformationFilter = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const searchParams = useSearchParams();
  const place = searchParams.get("place");

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <InformationFilterModal closeModal={closeModal} />
      </Modal>
      <button
        className={[
          !place ? "text-gray1" : "text-main",
          "hover:text-main flex flex-row items-center",
        ].join(" ")}
        onClick={openModal}
      >
        <VscSettings size="1.25rem" />
        <p className="text-sm text-nowrap">{!place ? "지역별" : place}</p>
      </button>
    </div>
  );
};
