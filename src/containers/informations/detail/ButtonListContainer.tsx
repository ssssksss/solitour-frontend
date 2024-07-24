"use client";

import ButtonList from "@/components/informations/detail/ButtonList";
import useAuthStore from "@/store/authStore";
import { useState } from "react";

interface Props {
  userId: number;
  informationId: number;
}

const ButtonListContainer = ({ userId, informationId }: Props) => {
  const { id } = useAuthStore();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ButtonList
      visible={userId === id}
      informationId={informationId}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default ButtonListContainer;
