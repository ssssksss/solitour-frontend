"use client"

import useModalState from "@/hooks/useModalState";
import { GatheringDetailResponseDto } from "@/types/GatheringDto";
import GatheringViewer from "./GatheringViewer";

interface IGatheringViewerContainer {
  data: GatheringDetailResponseDto;
  postId: number;
}
const GatheringViewerContainer = ({ data, postId }: IGatheringViewerContainer) => {
    
  const modalState = useModalState(); 

  return (
    <GatheringViewer
      data={data}
      postId={postId}
      modalState={modalState}
    />
  );
};
export default GatheringViewerContainer