import GatheringEditorDeadline from "@/components/gathering/createUpdate/editor/GatheringEditorDeadline";
import useModalState from "@/hooks/useModalState";

const GatheringEditorDeadlineContainer = () => {
  const modalState = useModalState();

  return <GatheringEditorDeadline modalState={modalState} />;
};
export default GatheringEditorDeadlineContainer;
