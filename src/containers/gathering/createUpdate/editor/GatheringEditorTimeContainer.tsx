import useModalState from "@/hooks/useModalState";
import GatheringEditorTime from "../../../../components/gathering/createUpdate/editor/GatheringEditorTime";

interface IGatheringEditorTimeContainer {}

const GatheringEditorTimeContainer = (props: IGatheringEditorTimeContainer) => {
  const modalState = useModalState();

  return <GatheringEditorTime modalState={modalState} />;
};
export default GatheringEditorTimeContainer;
