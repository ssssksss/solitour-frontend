import GatheringSupportManagement from "@/components/gathering/read/detail/GatheringSupportManagement";
import useAuthStore from "@/store/authStore";
import { useParams } from "next/navigation";
import { useState } from "react";

interface IGatheringSupportManagementContainer {
    postUserId: number;
    gatheringStatus: string;
}
const GatheringSupportManagementContainer = (props: IGatheringSupportManagementContainer) => {
    const authStore = useAuthStore();
  const params = useParams();
  const [gatheringStatus, setGatheringStatus] = useState<string | null>(props.gatheringStatus)
    
    // 모임 신청하기
    const applyGathering = async () => {
        const res = await fetch(`/api/gathering/apply?id=${params.id}`, {
            method: "POST"
        })
      if (res.ok) {
        setGatheringStatus("WAIT");
      }
    }

  // 모임 신청 취소 및 모임 신청 이후 취소, 승인 이후에도 취소 가능
    const cancelGathering = async () => {
        const res = await fetch(`/api/gathering/apply?id=${params.id}`, {
          method: "DELETE",
        });
      if (res.ok) {
        setGatheringStatus(null);
      }
  }

  // 모임 제거
    const removeGathering = async () => {
      const res = await fetch(`/api/gathering?id=${params.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("모임 제거 완료")
      }
    };
  
  if (authStore.id < 1) return; 

  return (
    <GatheringSupportManagement
      postUserId={props.postUserId}
      userId={authStore.id}
      applyGathering={applyGathering}
      cancelGathering={cancelGathering}
      gatheringStatus={gatheringStatus}
      removeGathering={removeGathering}
    />
  );
};
export default GatheringSupportManagementContainer