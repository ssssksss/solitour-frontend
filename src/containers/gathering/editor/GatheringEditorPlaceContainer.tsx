import GatheringEditorPlace from "@/components/gathering/editor/GatheringEditorPlace";
import useModalState from "@/hooks/useModalState";

interface IGatheringEditorPlaceContainer {

}
const GatheringEditorPlaceContainer = (props: IGatheringEditorPlaceContainer) => {
  const modalState = useModalState();

  return <GatheringEditorPlace modalState={modalState} />;
};
export default GatheringEditorPlaceContainer