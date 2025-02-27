"use client";

import AddUserInformationForm from "@/components/auth/AddUserInformationForm";
import FloatingButton from "@/components/common/FloatingButton";
import { Modal } from "@/components/common/modal/Modal";
import useModalState from "@/hooks/useModalState";
import useOutsideClick from "@/hooks/useOutsideClick";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const FloatingButtonContainer = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [animationFlag, setAnimationFlag] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const authStore = useAuthStore();
  const modalState = useModalState();
  const router = useRouter();

  const onClick = async () => {
    if (visible) {
      setAnimationFlag(true);
      await new Promise((resolve) => setTimeout(resolve, 250));
      setAnimationFlag(false);
    }

    setVisible(!visible);
  };

  const createGatheringClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    onClick();
    if (authStore.id > 0 && (!authStore.sex || !authStore.age)) {
      e.preventDefault();
      modalState.openModal();
    }
    if (authStore.id < 1) {
      e.preventDefault();
      router.push("/auth/signin");
    }
  };

  const onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useOutsideClick(ref, () => {
    onClick();
  });

  return (
    <>
      <Modal modalState={modalState}>
        <AddUserInformationForm />
      </Modal>
      <FloatingButton
        visible={visible}
        animationFlag={animationFlag}
        onClick={onClick}
        createGatheringClick={createGatheringClick}
        onScrollToTop={onScrollToTop}
        ref={ref}
      />
    </>
  );
};

export default FloatingButtonContainer;
