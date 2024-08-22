"use client"

import DeleteModal from "@/components/common/DeleteModal";
import { useParams, useRouter } from "next/navigation";

interface IGatheringDeleteModalContainer {
    closeModal: () => void;
}
const GatheringDeleteModalContainer = ({
  closeModal,
}: IGatheringDeleteModalContainer) => {
  const router = useRouter();
  const params = useParams();

  const deleteHandle = async () => {
    const response = await fetch(`/api/gatherings/${params.id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      alert("모임 삭제에 실패하였습니다.");
      closeModal();
      throw new Error(response.statusText);
    }

    router.replace("/gathering");
    router.refresh();
  };
    
  return (
    <DeleteModal onDeleteClick={deleteHandle} onCancelClick={()=>closeModal()} />
  );
};
export default GatheringDeleteModalContainer