"use client";

import ButtonList from "@/components/informations/detail/ButtonList";
import useAuthStore from "@/store/authStore";

interface Props {
  userId: number;
  informationId: number;
}

const ButtonListContainer = ({ userId, informationId }: Props) => {
  const { id } = useAuthStore();

  return <ButtonList visible={userId === id} informationId={informationId} />;
};

export default ButtonListContainer;
