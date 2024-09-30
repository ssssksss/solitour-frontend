import { Modal } from "@/components/common/modal/Modal";
import GatheringFilterModal from "@/components/gathering/read/modal/GatheringFilterModal";
import useModalState from "@/hooks/useModalState";
import { useEffect, useState } from "react";
import { VscSettings } from "react-icons/vsc";

interface IGatheringFilterContainer {}
const GatheringFilterContainer = (props: IGatheringFilterContainer) => {
  const modalState = useModalState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="relative flex h-[2rem] w-[3.5rem] flex-shrink-0 animate-pulse items-center rounded-xl bg-gray-300 text-left"></div>
    );

  return (
    <>
      <button
        className="flex flex-row items-center hover:text-main"
        onClick={() => modalState.openModal()}
      >
        <VscSettings size={"1.25rem"} />
        <div>필터</div>
      </button>
      <Modal
        modalState={modalState}
      >
        <GatheringFilterModal/>
      </Modal>
    </>
  );
};
export default GatheringFilterContainer;
