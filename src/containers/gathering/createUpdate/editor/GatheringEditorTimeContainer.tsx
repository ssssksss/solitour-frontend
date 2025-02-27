import GatheringEditorTime from "@/components/gathering/createUpdate/editor/GatheringEditorTime";
import useModalState from "@/hooks/useModalState";

const GatheringEditorTimeContainer = () => {
  const modalState = useModalState();

  return <GatheringEditorTime modalState={modalState} />;
};
export default GatheringEditorTimeContainer;
