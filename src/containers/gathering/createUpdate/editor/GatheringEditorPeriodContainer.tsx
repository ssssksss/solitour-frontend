import GatheringEditorPeriod from "@/components/gathering/createUpdate/editor/GatheringEditorPeriod";
import useModalState from "@/hooks/useModalState";

interface IGatheringEditorPeriodContainer {}
const GatheringEditorPeriodContainer = (props: IGatheringEditorPeriodContainer) => {
  const modalState = useModalState(); 

  return <GatheringEditorPeriod modalState={modalState} />;
};
export default GatheringEditorPeriodContainer