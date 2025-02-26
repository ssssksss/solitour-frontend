import GatheringEditorParticipantsFilter from "@/components/gathering/createUpdate/editor/GatheringEditorParticipantsFilter";
import useModalState from "@/hooks/useModalState";

const GatheringEditorParticipantsFilterContainer = () => {
  const modalState = useModalState();
  return <GatheringEditorParticipantsFilter modalState={modalState} />;
};
export default GatheringEditorParticipantsFilterContainer;
