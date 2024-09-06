"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface IGatheringDeleteModalContainer {
  closeModal: () => void;
}

const GatheringDeleteModalContainer = ({
  closeModal,
}: IGatheringDeleteModalContainer) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();

  const deleteHandle = async () => {
    setLoading(true);

    const response = await fetch(`/api/gatherings/${params.id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      alert("모임 삭제에 실패하였습니다.");
      setLoading(false);
      closeModal();
      throw new Error(response.statusText);
    }

    router.replace("/gathering");
    router.refresh();
  };

  return (
    <DeleteModal
      loading={loading}
      onDeleteClick={deleteHandle}
      onCancelClick={() => closeModal()}
    />
  );
};
export default GatheringDeleteModalContainer;
