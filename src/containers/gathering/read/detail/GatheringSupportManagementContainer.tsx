import GatheringSupportManagement from "@/components/gathering/read/detail/GatheringSupportManagement";
import useAuthStore from "@/store/authStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useParams } from "next/navigation";
import { useState } from "react";

interface IGatheringSupportManagementContainer {
  postUserId: number;
  gatheringStatus: string;
  isFinish: boolean;
}
const GatheringSupportManagementContainer = (props: IGatheringSupportManagementContainer) => {
  const authStore = useAuthStore();
  const params = useParams();
  const [gatheringStatus, setGatheringStatus] = useState<string | null>(
    props.gatheringStatus,
  );
  const [isFinish, setIsFinish] = useState(props.isFinish);

  // 모임 신청하기
  const applyGathering = async () => {
    const res = await fetch(`/api/gathering/apply?id=${params.id}`, {
      method: "POST",
    });
    if (res.ok) {
      setGatheringStatus("WAIT");
    }
  };

  // 모임 신청 취소 및 모임 신청 이후 취소, 승인 이후에도 취소 가능
  const cancelGathering = async () => {
    const res = await fetch(`/api/gathering/apply?id=${params.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setGatheringStatus(null);
    }
  };

  const reOpenGathering = async () => {
    // 모임 다시 활성화하기
    const response = await fetchWithAuth(
      `/api/gathering/finish?isFinish=true&id=${params.id}`,
      {
        method: "PUT",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return;
    }

    setIsFinish(false);
  };

  // 로그인 작업이 처리되기전에 authStore.id == 0
  if (authStore.id == 0)
    return (
      <div className="flex animate-pulse gap-2 max-[960px]:flex-col min-[960px]:flex-row">
        <div className="h-[3.125rem] w-[7.5rem] rounded-[2.125rem] bg-gray-300" />
        <div className="h-[3.125rem] w-[7.5rem] rounded-[2.125rem] bg-gray-300" />
      </div>
    );

  return (
    <GatheringSupportManagement
      postUserId={props.postUserId}
      userId={authStore.id}
      applyGathering={applyGathering}
      cancelGathering={cancelGathering}
      gatheringStatus={gatheringStatus}
    />
  );
};
export default GatheringSupportManagementContainer