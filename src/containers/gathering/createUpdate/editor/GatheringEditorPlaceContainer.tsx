import GatheringEditorPlace from "@/components/gathering/createUpdate/editor/GatheringEditorPlace";
import useModalState from "@/hooks/useModalState";

interface IGatheringEditorPlaceContainer {}

const GatheringEditorPlaceContainer = (
  props: IGatheringEditorPlaceContainer,
) => {
  const modalState = useModalState();

  return <GatheringEditorPlace modalState={modalState} />;
};
export default GatheringEditorPlaceContainer;
