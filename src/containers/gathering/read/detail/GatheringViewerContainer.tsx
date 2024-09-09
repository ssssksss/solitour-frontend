"use client"

import GatheringViewer from "@/components/gathering/read/detail/GatheringViewer";
import useModalState from "@/hooks/useModalState";
import useGatheringStore from "@/store/gatheringStore";
import { GatheringDetailResponseDto } from "@/types/GatheringDto";
import { useEffect } from "react";

interface IGatheringViewerContainer {
  data: GatheringDetailResponseDto;
  postId: number;
}
const GatheringViewerContainer = ({ data, postId }: IGatheringViewerContainer) => {
    
  const modalState = useModalState();
  const gatheringStore = useGatheringStore();

  useEffect(() => {
    gatheringStore.setGathering({
      currentParticipants: data.nowPersonCount,
      gatheringApplicantsResponses: data.gatheringApplicantsResponses,
      isFinish: data.isFinish,
      deadline: data.deadline,
      personCount: data.personCount,
    });
  },[])

  return (
    <GatheringViewer
      data={data}
      postId={postId}
      modalState={modalState}
      currentParticipants={gatheringStore.currentParticipants}
    />
  );
};
export default GatheringViewerContainer