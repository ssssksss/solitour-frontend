"use client";

import { MyPageAccountDeleteModal } from "./MyPageAccountDeleteModal";
import { User } from "@/entities/user";
import { useModal } from "@/shared/lib/hooks";
import { Modal } from "@/shared/ui/modal";

interface DeleteAccountProps {
  userInfo: User;
}

export const DeleteAccount = ({ userInfo }: DeleteAccountProps) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <div className="text-gray2 flex w-full justify-end pt-12">
        <button className="hover:text-main hover:font-bold" onClick={openModal}>
          회원 탈퇴
        </button>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <MyPageAccountDeleteModal userInfo={userInfo} closeModal={closeModal} />
      </Modal>
    </div>
  );
};
