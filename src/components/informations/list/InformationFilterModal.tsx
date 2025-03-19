"use client";

import { LOCATION } from "@/shared/config/location";
import { useInformationFilterModal } from "@/hooks/information/list/useInformationFilterModal";
import { MdClose } from "react-icons/md";

interface InformationFilterModalProps {
  closeModal: () => void;
}

const InformationFilterModal = ({
  closeModal,
}: InformationFilterModalProps) => {
  const { place, setPlace, handleClick } =
    useInformationFilterModal(closeModal);

  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit max-h-[calc(100%_-_48px)] w-80 max-w-[calc(100%_-_48px)] flex-col overflow-y-auto rounded-xl bg-white p-6">
        <div className="flex flex-row items-center justify-end">
          <MdClose
            className="text-gray2 hover:text-main cursor-pointer"
            size={"2.5rem"}
            onClick={() => {
              window.history.back();
              closeModal();
            }}
          />
        </div>
        <div className="flex flex-col gap-4 px-5 pb-2">
          <h3 className="text-lg font-bold text-black">지역별</h3>
          <div className="text-gray1 flex flex-wrap items-start gap-2 font-medium">
            <button
              className={`${place === null ? "border-main bg-main text-white" : ""} hover:border-main hover:bg-main rounded-full border border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105 hover:text-white`}
              type="button"
              onClick={() => setPlace(null)}
            >
              전체
            </button>
            {LOCATION.map((location, i) => (
              <button
                key={i}
                className={`${location === place ? "border-main bg-main text-white" : ""} hover:border-main hover:bg-main rounded-full border border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105 hover:text-white`}
                type="button"
                onClick={() => setPlace(location)}
              >
                {location}
              </button>
            ))}
          </div>
          <button
            className={`${place === "" ? "hidden" : ""} bg-main h-11 w-full rounded-full text-[0.9375rem] text-white hover:scale-105`}
            type="button"
            onClick={handleClick}
          >
            필터 적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformationFilterModal;
