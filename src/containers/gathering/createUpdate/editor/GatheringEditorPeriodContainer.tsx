import GatheringEditorPeriod from "@/components/gathering/createUpdate/editor/GatheringEditorPeriod";
import useModalState from "@/hooks/useModalState";

const GatheringEditorPeriodContainer = () => {
  const modalState = useModalState();

  return <GatheringEditorPeriod modalState={modalState} />;
};
export default GatheringEditorPeriodContainer;
