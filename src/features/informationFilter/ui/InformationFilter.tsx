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
    <div className="flex flex-row items-center gap-4 text-sm font-medium">
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
        <p className="text-nowrap">{!place ? "지역별" : place}</p>
      </button>
      {/* <div className="relative">
        <button
          className="text-gray1 hover:text-main flex flex-row items-center"
          onClick={() => {
            setSearchDropdownVisible(false);
            setOrderDropdownVisible(true);
          }}
        >
          <p className="text-nowrap">
            {order === "latest"
              ? "최신순"
              : order === "likes"
                ? "좋아요순"
                : "조회순"}
          </p>
          <IoIosArrowDown />
        </button>
        {orderDropdownVisible && (
          <div
            className="text-gray1 absolute top-7 -left-[4.5rem] z-10 flex w-[8.625rem] flex-col items-center gap-1 rounded-xl bg-white/95 shadow-sm"
            onClick={() => setOrderDropdownVisible(false)}
          >
            {ORDER_LIST.map((value) => (
              <button
                key={value.title}
                className={[
                  order === value.href ? "text-main" : "",
                  "hover:text-main flex h-16 w-full items-center justify-center",
                ].join(" ")}
                type="button"
                onClick={() => handleOrderClick(value.href)}
              >
                {value.title}
              </button>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};
