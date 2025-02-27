import GatheringEditorPlace from "@/components/gathering/createUpdate/editor/GatheringEditorPlace";
import useModalState from "@/hooks/useModalState";

const GatheringEditorPlaceContainer = () => {
  const modalState = useModalState();

  return <GatheringEditorPlace modalState={modalState} />;
};
export default GatheringEditorPlaceContainer;
