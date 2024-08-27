import GatheringEditorDeadline from "@/components/gathering/editor/GatheringEditorDeadline";
import useModalState from "@/hooks/useModalState";

interface IGatheringEditorDeadlineContainer {

}
const GatheringEditorDeadlineContainer = (props: IGatheringEditorDeadlineContainer) => {
   const modalState = useModalState();

   return <GatheringEditorDeadline modalState={modalState} />;
};
export default GatheringEditorDeadlineContainer