import { Modal } from "@/components/common/modal/Modal";
import { useFormContext } from "react-hook-form";
import GatheringPlaceModal from "../modal/GatheringPlaceModal";

interface GatheringPlaceSettingPanelProps {
  isModal: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const GatheringPlaceSettingPanel = ({
  isModal, closeModal, openModal
}: GatheringPlaceSettingPanelProps) => {
  const formContext = useFormContext();
  
  return (
      <div className={"flex w-full items-center gap-x-[2rem]"}>
        <div className={"w-[7rem] flex-shrink-0"}>
          <span className={"relative text-lg font-semibold"}>
            장소
            <span className="absolute right-[-.5rem] top-[-.5rem] text-lg text-main">*</span>
          </span>
        </div>
        <button
          onClick={openModal}
          className={"h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white"}
        >
          장소 선택
        </button>
        <div>{formContext.getValues("placeName") && "OK"}</div>
        {typeof window !== "undefined" && (
          <Modal isOpen={isModal} onClose={closeModal}>
            <GatheringPlaceModal closeModal={closeModal} />
          </Modal>
        )}
      </div>
  );
};

export default GatheringPlaceSettingPanel;
