"use client";

import ButtonList from "@/components/informations/detail/ButtonList";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

interface Props {
  userId: number;
  informationId: number;
}

const ButtonListContainer = ({ userId, informationId }: Props) => {
  const router = useRouter();
  const { id } = useAuthStore();

  const onDeleteClick = async () => {
    const response = await fetch(`/api/informations/${informationId}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      alert("정보 삭제에 실패하였습니다.");
      throw new Error(response.statusText);
    }

    router.replace("/informations/list/parent-category/1?page=1");
  };

  return (
    <ButtonList
      visible={userId === id}
      informationId={informationId}
      onDeleteClick={onDeleteClick}
    />
  );
};

export default ButtonListContainer;
