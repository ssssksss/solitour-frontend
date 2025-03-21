"use client";

import { useModalState } from "@/shared/lib/hooks";
import { MyPageAccountDeleteModal } from "./MyPageAccountDeleteModal";
import { User } from "@/entities/user";
import { Modal } from "@/shared/ui/modal";

interface DeleteAccountProps {
  userInfo: User;
}

export const DeleteAccount = ({ userInfo }: DeleteAccountProps) => {
  const modalState = useModalState();

  return (
    <div>
      <div className="text-gray2 flex w-full justify-end pt-12">
        <button
          className="hover:text-main cursor-pointer hover:font-bold"
          onClick={modalState.openModal}
        >
          회원 탈퇴
        </button>
      </div>
      <Modal modalState={modalState}>
        <MyPageAccountDeleteModal userInfo={userInfo} />
      </Modal>
    </div>
  );
};
