import GatheringEditorDeadline from "@/components/gathering/createUpdate/editor/GatheringEditorDeadline";
import useModalState from "@/hooks/useModalState";

interface IGatheringEditorDeadlineContainer {}

const GatheringEditorDeadlineContainer = (
  props: IGatheringEditorDeadlineContainer,
) => {
  const modalState = useModalState();

  return <GatheringEditorDeadline modalState={modalState} />;
};
export default GatheringEditorDeadlineContainer;
