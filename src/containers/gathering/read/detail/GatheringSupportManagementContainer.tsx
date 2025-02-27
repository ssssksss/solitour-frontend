import GatheringSupportManagement from "@/components/gathering/read/detail/GatheringSupportManagement";
import useModalState from "@/hooks/useModalState";
import useAuthStore from "@/stores/authStore";
import useGatheringStore from "@/stores/gatheringStore";
import useToastifyStore from "@/stores/toastifyStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useParams } from "next/navigation";
import { useState } from "react";

interface IGatheringSupportManagementContainer {
  postUserId: number;
  gatheringStatus: string;
  isFinish: boolean;
  openChattingUrl: string;
  allowedGender: string;
  allowedAgeRange: {
    startAge: number;
    endAge: number;
  };
}
const GatheringSupportManagementContainer = (
  props: IGatheringSupportManagementContainer,
) => {
  const authStore = useAuthStore();
  const gatheringStore = useGatheringStore();
  const toastifyStore = useToastifyStore();
  const params = useParams();
  const [gatheringStatus, setGatheringStatus] = useState<string | null>(
    props.gatheringStatus,
  );
  const [isFinish, setIsFinish] = useState(props.isFinish);
  const modalState = useModalState();
  const modalState1 = useModalState();
  const modalState2 = useModalState();
  // 모임 신청하기
  const applyGathering = async () => {
    const res = await fetchWithAuth(`/api/gathering/apply?id=${params.id}`, {
      method: "POST",
    });
    if (res.ok) {
      setGatheringStatus("WAIT");
      toastifyStore.setToastify({
        type: "success",
        message: "모임을 신청했습니다.",
      });
    }
    if (!res.ok) {
      toastifyStore.setToastify({
        type: "error",
        message: "모임을 신청에 실패했습니다.",
      });
    }
  };

  // 모임 신청 취소 및 모임 신청 이후 취소, 승인 이후에도 취소 가능
  const cancelGathering = async () => {
    const res = await fetchWithAuth(`/api/gathering/apply?id=${params.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setGatheringStatus(null);
      if (gatheringStatus == "CONSENT") {
        gatheringStore.setGathering({
          currentParticipants: gatheringStore.currentParticipants - 1,
        });
      }
      toastifyStore.setToastify({
        type: "warning",
        message: "모임을 취소했습니다.",
      });
    }
    if (!res.ok) {
      toastifyStore.setToastify({
        type: "error",
        message: "모임을 취소에 실패했습니다.",
      });
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
      toastifyStore.setToastify({
        type: "error",
        message: "모임 활성화를 실패하였습니다.",
      });
      return;
    }

    setIsFinish(false);
    gatheringStore.setGathering({
      isFinish: false,
    });
    toastifyStore.setToastify({
      type: "success",
      message: "모임이 활성화 되었습니다.",
    });
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
      modalState={modalState}
      modalState1={modalState1}
      modalState2={modalState2}
      isFinish={isFinish}
      openChattingUrl={props.openChattingUrl}
      reOpenGathering={reOpenGathering}
      isFullParticipants={
        gatheringStore.personCount == gatheringStore.currentParticipants
      }
      isAllowedGender={
        props.allowedGender == "ALL" ||
        authStore.sex.toUpperCase() == props.allowedGender
      }
      isAllowedAgeRange={
        authStore.age <= props.allowedAgeRange.startAge &&
        authStore.age >= props.allowedAgeRange.endAge
      }
    />
  );
};
export default GatheringSupportManagementContainer;
