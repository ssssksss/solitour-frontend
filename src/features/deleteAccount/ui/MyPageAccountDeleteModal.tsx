"use client";

import { User } from "@/entities/user";
import { ReactNode } from "react";
import { useMyPageAccountDeleteModal } from "../model/useMyPageAccountDeleteModal";
import { ModalTemplate } from "@/shared/ui/modal";

interface MyPageAccountDeleteModalProps {
  userInfo: User;
  closeButtonComponent?: ReactNode;
  closeModal?: () => void;
}

export const MyPageAccountDeleteModal = ({
  userInfo,
  closeButtonComponent,
  closeModal,
}: MyPageAccountDeleteModalProps) => {
  const { userDeleteText, handleUserDeleteTextChange, handleDeleteClick } =
    useMyPageAccountDeleteModal(userInfo, closeModal);

  return (
    <ModalTemplate className="max-h-96 w-[calc(100vw-1rem)] max-w-160 flex-col gap-y-4 px-16">
      {closeButtonComponent}
      <div className="flex flex-col gap-y-2">
        <p>
          1. 회원 탈퇴 후에는 복구가 불가능하며, 현재 진행 중인 모임 서비스나
          여행일기 서비스 이용 내역이 있을 경우, 관련 정보도 함께 삭제됩니다.
        </p>
        <p>
          2. 정보 게시글은 삭제되지 않지만 사용자와 관련된 내용은 전부 비공개
          처리되고 이후에는 수정이나 삭제는 불가능해집니다.
        </p>
        <p>3. 필요한 정보는 회원 탈퇴하기전에 따로 보관해주시기 바랍니다.</p>
      </div>
      <div className="flex items-end gap-x-1 select-none">
        <span className="text-main text-lg">회원 탈퇴를 하겠습니다.</span>
        <span>라고 입력해주세요.</span>
      </div>
      <input
        className="w-full rounded-2xl px-4 py-4 outline -outline-offset-1 outline-[#E3E3E3]"
        placeholder="텍스트를 입력해주세요."
        onChange={(e) => handleUserDeleteTextChange(e.target.value)}
      />
      <button
        className="bg-main disabled:bg-gray2 h-12 w-full shrink-0 rounded-full text-white"
        disabled={userDeleteText !== "회원 탈퇴를 하겠습니다."}
        onClick={handleDeleteClick}
      >
        회원 탈퇴
      </button>
    </ModalTemplate>
  );
};
