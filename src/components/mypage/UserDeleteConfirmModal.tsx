import useAuthStore from "@/store/authStore";
import useToastifyStore from "@/store/toastifyStore";
import { IModalComponent } from "@/types/ModalState";
import { userResponseDto } from "@/types/UserDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalTemplate from "../common/modal/ModalTemplate";

interface IUserDeleteConfirmModal extends IModalComponent {
    userInfo: userResponseDto
}
const UserDeleteConfirmModal = (props: IUserDeleteConfirmModal) => {
  const [userDeleteText, setUserDeleteText] = useState("");
  const authStore = useAuthStore();
  const toastifyStore = useToastifyStore();
  const router = useRouter();
    
  const changeUserDeleteText = (value: string) => {
    setUserDeleteText(value);
  };
    
  const userDeleteHandler = async () => {
    const response = await fetchWithAuth(
      `/api/auth/user?type=${props.userInfo.provider}`,
      {
        method: "DELETE",
        "Content-Type": "application/json",
      },
    );

    if (response.ok) {
      authStore.initialize();
      await toastifyStore.setToastify({
        type: "success",
        message: "회원탈퇴에 성공했습니다.",
      });
      props.closeModal && props.closeModal();
      setTimeout(() => {
        router.replace("/");
      }, 300);
    } else {
      toastifyStore.setToastify({
        type: "error",
        message: "회원탈퇴에 실패했습니다.",
      });
    }
  };

  return (
    <ModalTemplate
      className={
        "max-h-[24rem] w-[calc(100vw-1rem)] max-w-[40rem] flex-col gap-y-[1rem] px-[4rem]"
      }
    >
      {props.closeButtonComponent}
      <div className={"flex flex-col gap-y-[.5rem]"}>
        <p>
              1. 회원 탈퇴 후에는 복구가 불가능하며, 현재 진행 중인 모임
              서비스나 여행일기 서비스 이용 내역이 있을 경우, 관련 정보도 함께
              삭제됩니다.
        </p>
        <p>
              2. 정보 게시글은 삭제되지 않지만 사용자와 관련된 내용은 전부
              비공개 처리되고 이후에는 수정이나 삭제는 불가능해집니다.
        </p>
        <p>3. 필요한 정보는 회원탈퇴하기전에 따로 보관해주시기 바랍니다.</p>
      </div>
      <div className="flex select-none items-end gap-x-[.25rem]">
        <span className={"text-lg text-main"}>회원탈퇴를 하겠습니다.</span>
        <span> 라고 입력해주세요. </span>
      </div>
      <input
        className="w-full rounded-[1rem] px-4 py-4 outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
        placeholder="텍스트를 입력해주세요."
        onChange={(e) => changeUserDeleteText(e.target.value)}
      />
      <button
        disabled={userDeleteText !== "회원탈퇴를 하겠습니다."}
        onClick={userDeleteHandler}
        className={
          "h-[3rem] w-full flex-shrink-0 rounded-full bg-main text-white disabled:bg-gray2"
        }
      >
            회원탈퇴
      </button>
    </ModalTemplate>
  );
};
export default UserDeleteConfirmModal;