import MyPageUserImageContainer from "@/containers/mypage/MyPageUserImageContainer";
import { ModalState } from "@/types/ModalState";
import { userResponseDto } from "@/types/UserDto";
import { MYPAGE_PROFILE_BREADCRUMB_PATH } from "@/utils/constant/BreadCrumbDirectory";
import Image from "next/image";
import Breadcrumbs from "../common/Breadcrumb";
import { Modal } from "../common/modal/Modal";

interface IMyProfileProps {
  userInfo: userResponseDto;
  submitChangeNicknameHandler: () => void;
  nickname: string;
  changeNickname: (value: string) => void;
  defaultNickname: string;
  message: string;
  modalState: ModalState;
  changeUserDeleteText: (value: string) => void;
  userDeleteText: string;
  userDeleteHandler: () => void;
}

const NICKNAME_LENGTH = 30;

const MyProfile = (props: IMyProfileProps) => {
  return (
    <div className={"flex w-full flex-col"}>
      <Breadcrumbs categories={MYPAGE_PROFILE_BREADCRUMB_PATH} />
      <h1 className={"text-3xl font-semibold"}> 프로필 설정 </h1>
      <MyPageUserImageContainer
        userImageUrl={props.userInfo.userImage.address}
        userSex={props.userInfo.sex}
      />
      <Modal
        onClose={props.modalState.closeModal}
        isOpen={props.modalState.isOpen}
        isHeaderBar={true}
        headerBarStyle="rounded-t-xl bg-white"
      >
        <div
          className={
            "relative flex max-h-[24rem] w-[calc(100vw-1rem)] max-w-[40rem] flex-col gap-y-[1rem] overflow-y-scroll rounded-b-xl bg-white p-[2.75rem] scrollbar-hide"
          }
        >
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
            <span className={"text-lg text-main"}>
              {`'회원탈퇴를 하겠습니다.'`}
            </span>
            <span> 라고 입력해주세요. </span>
          </div>
          <input
            className="w-full rounded-[1rem] px-4 py-4 outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
            placeholder="텍스트를 입력해주세요."
            onChange={(e) => props.changeUserDeleteText(e.target.value)}
          />
          <button
            disabled={props.userDeleteText !== "회원탈퇴를 하겠습니다."}
            onClick={props.userDeleteHandler}
            className={
              "h-[3rem] w-full flex-shrink-0 rounded-full bg-main text-white disabled:bg-gray2"
            }
          >
            회원탈퇴
          </button>
        </div>
      </Modal>
      <div className={"mt-[1rem] flex flex-col gap-y-[2.375rem]"}>
        <article>
          <div className={"flex w-full items-center gap-x-[2.375rem]"}>
            <div className={"relative w-[3.5rem] flex-shrink-0"}>
              <span className={"text-lg font-semibold"}>닉네임</span>
              <span className="absolute top-[-.5rem] text-lg text-main">*</span>
            </div>

            <label className="group relative w-full">
              <input
                className="flex h-[3.25rem] w-full rounded-[28px] pl-[2rem] pr-[5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
                type="text"
                autoComplete="search"
                name="nickname"
                placeholder="닉네임을 입력해주세요"
                maxLength={NICKNAME_LENGTH}
                minLength={1}
                defaultValue={props.userInfo.nickname}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.ctrlKey && e.key === "Enter") {
                    props.submitChangeNicknameHandler();
                  }
                }}
                onChange={(e) => props.changeNickname(e.target.value)}
              />
              <button
                className={`${props.nickname == props.defaultNickname ? "bg-gray-400" : "bg-main"} absolute right-[.5rem] top-[50%] h-[2.4rem] translate-y-[-50%] rounded-[28px] px-3 text-white opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100`}
                onClick={() => {
                  props.submitChangeNicknameHandler();
                }}
              >
                변경
              </button>
            </label>
          </div>

          <div
            className={`flex w-full pl-[7.75rem] ${props.message ? "justify-between" : "justify-end"} pt-[.75rem] text-sm text-gray1`}
          >
            {props.message != "" && (
              <span
                className={`${props.message == "성공" ? "text-blue-400" : "text-[#FF0000]"}`}
              >
                {`변경이 ${props.message} 했습니다.`}
              </span>
            )}
            <span>
              {props.nickname.length}/{NICKNAME_LENGTH}
            </span>
          </div>
        </article>
        <article>
          <div className={"flex w-full items-center gap-x-[2.375rem]"}>
            <div className={"relative w-[3.5rem] flex-shrink-0"}>
              <span className={"text-lg font-semibold"}>이메일</span>
            </div>
            <input
              disabled={true}
              placeholder="이메일을 입력해주세요"
              className="h-[3.25rem] w-full rounded-[28px] pl-[2rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              defaultValue={props.userInfo.email}
            />
          </div>
        </article>
        {/* <article>
          <div className={"flex w-full items-center gap-x-[2.375rem]"}>
            <div className={"relative w-[3.5rem] flex-shrink-0"}>
              <span className={"text-lg font-semibold"}>성별</span>
            </div>
            <input
              disabled={true}
              placeholder="성별을 입력해주세요"
              className="h-[3.25rem] w-full rounded-[28px] pl-[2rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              defaultValue={props.userInfo.sex == "male" ? "남성" : "여성"}
            />
          </div>
        </article> */}
        <article>
          <div
            className={
              "grid h-[2.5rem] w-full grid-cols-[6rem_auto] gap-x-[1.75rem]"
            }
          >
            <div className={"flex items-center text-lg font-semibold"}>
              연동된 계정
            </div>
            <div className={"flex items-center justify-between"}>
              <span> {props.userInfo.provider} </span>
              <div className={"flex items-center gap-x-[.875rem]"}>
                <span className={"font-medium text-gray1"}>
                  {props.userInfo.userImage.createdDate}
                </span>
                <div className="relative flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[50%] bg-[#FEE501]">
                  {props.userInfo.provider == "kakao" && (
                    <Image
                      src={"/user/kakao-icon.svg"}
                      alt={"kakao-icon-image"}
                      width={20}
                      height={20}
                      className={"absolute translate-x-[1px]"}
                    />
                  )}
                  {props.userInfo.provider == "google" && (
                    <Image
                      src={"/user/google-icon.svg"}
                      alt={"google-icon-image"}
                      width={20}
                      height={20}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div className="flex w-full justify-end pt-[3rem] text-[#999999]">
        <button
          className={"hover:font-bold hover:text-main"}
          onClick={props.modalState.openModal}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
};
export default MyProfile;
