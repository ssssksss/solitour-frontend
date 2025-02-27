"use client";

import RemoveModal from "@/components/common/RemoveModal";
import useToastifyStore from "@/stores/toastifyStore";
import { IModalComponent } from "@/types/ModalState";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface IGatheringStatusChangeModalContainer extends IModalComponent {
  isFinish: boolean;
}

const GatheringStatusChangeModalContainer = ({
  isFinish,
  ...props
}: IGatheringStatusChangeModalContainer) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const toastifyStore = useToastifyStore();

  const removeHandle = async () => {
    setLoading(true);

    // 모임 제거
    const response = await fetchWithAuth(
      `/api/gathering/finish?isFinish=${isFinish}&id=${params.id}`,
      {
        method: "PUT",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      toastifyStore.setToastify({
        type: "error",
        message: "모임 마감에 실패했습니다.",
      });
      setLoading(false);
      props.closeModal!();
      return;
      // throw new Error(response.statusText);
    }

    router.replace("/gathering");
    router.refresh();
  };

  return (
    <RemoveModal
      loading={loading}
      onRemoveClick={removeHandle}
      onCancelClick={() => props.closeModal!()}
      mainMessage={["모임을 마감하시겠습니까?"]}
      subMessage={[
        "모임을 마감하시면 추가적으로 인원을 받을 수 없고 검색에서 제외됩니다.",
        "단, 기존 승인된 회원은 조회가 가능합니다.",
      ]}
    />
  );
};
export default GatheringStatusChangeModalContainer;
