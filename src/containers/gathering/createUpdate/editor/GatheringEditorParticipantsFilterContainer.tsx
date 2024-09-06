import GatheringEditorParticipantsFilter from "@/components/gathering/createUpdate/editor/GatheringEditorParticipantsFilter";
import useModalState from "@/hooks/useModalState";

interface IGatheringEditorParticipantsFilterContainer {

}
const GatheringEditorParticipantsFilterContainer = (props: IGatheringEditorParticipantsFilterContainer) => {
  const modalState = useModalState();
  return (
    <GatheringEditorParticipantsFilter modalState={modalState} />
  );
};
export default GatheringEditorParticipantsFilterContainer