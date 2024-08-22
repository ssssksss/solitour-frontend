import GatheringEditorPeriod from "@/components/gathering/editor/GatheringEditorPeriod";
import useModalState from "@/hooks/useModalState";

interface IGatheringEditorPeriodContainer {}
const GatheringEditorPeriodContainer = (props: IGatheringEditorPeriodContainer) => {
  const modalState = useModalState(); 

  return <GatheringEditorPeriod modalState={modalState} />;
};
export default GatheringEditorPeriodContainer