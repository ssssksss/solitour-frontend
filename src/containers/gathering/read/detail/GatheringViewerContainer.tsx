"use client"

import GatheringViewer from "@/components/gathering/read/detail/GatheringViewer";
import GatheringRecommendationList from "@/components/gathering/read/GatheringRecommendationList";
import useModalState from "@/hooks/useModalState";
import useGatheringStore from "@/store/gatheringStore";
import { GatheringDetailResponseDto } from "@/types/GatheringDto";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IGatheringViewerContainer {
  // data: GatheringDetailResponseDto;
  postId: number;
}
const GatheringViewerContainer = ({ postId }: IGatheringViewerContainer) => {
    
  const modalState = useModalState();
  const gatheringStore = useGatheringStore();
  const params = useParams();
  const [data, setData] = useState<GatheringDetailResponseDto>();

  useEffect(() => {

    const getGathering = async () => {
      const res = await fetch(`/api/gathering/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const data = await res.json();
      setData(data);
      gatheringStore.setGathering({
        currentParticipants: data.nowPersonCount,
        gatheringApplicantsResponses: data.gatheringApplicantsResponses,
        isFinish: data.isFinish,
        deadline: data.deadline,
        personCount: data.personCount,
      });
    }
    getGathering();
  },[])

  return (
    <>
      {
        data != undefined &&
        <>
          <GatheringViewer
          data={data}
          postId={postId}
          modalState={modalState}
          currentParticipants={gatheringStore.currentParticipants}
          />
          <GatheringRecommendationList data={data.gatheringRecommend} />
      </>
      }
    </>
  );
};
export default GatheringViewerContainer