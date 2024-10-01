import MyPageUserImageContainer from "@/containers/mypage/MyPageUserImageContainer";
import { ModalState } from "@/types/ModalState";
import { userResponseDto } from "@/types/UserDto";
import { MYPAGE_PROFILE_BREADCRUMB_PATH } from "@/utils/constant/BreadCrumbDirectory";
import Image from "next/image";
import Breadcrumbs from "../common/Breadcrumb";
import { Modal } from "../common/modal/Modal";
import UserDeleteConfirmModal from "./UserDeleteConfirmModal";

interface IMyProfileProps {
  userInfo: userResponseDto;
  submitChangeNicknameHandler: () => void;
  nickname: string;
  changeNickname: (value: string) => void;
  defaultNickname: string;
  message: string;
  modalState: ModalState;
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
                {props.userInfo.provider == "kakao" && 
                       <div className="relative flex h-[2.5rem] w-[2.5rem] p-4 items-center justify-center rounded-[50%] bg-[#FEE501]">
                         <Image
                           src={"/user/kakao-icon.svg"}
                           alt={"kakao-icon-image"}
                           width={20}
                           height={20}
                           className={"absolute translate-x-[1px] "}
                         />
                       </div>
                }
                {/* {props.userInfo.provider == "google" && 
                    <div className="relative flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[50%] bg-white">
                    <Image
                      src={"/user/google-icon.svg"}
                      alt={"google-icon-image"}
                      width={20}
                      height={20}
                      />
                    </div>
                  } */}
                {props.userInfo.provider == "naver" && 
                    <div className="relative flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[50%] bg-[#03C75A]">
                      <Image
                        src={"/user/naver-icon.svg"}
                        alt={"naver-icon-image"}
                        width={28}
                        height={28}
                      />
                    </div>
                }
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
      <Modal
        modalState={props.modalState}
      >
        <UserDeleteConfirmModal userInfo={props.userInfo} />
      </Modal>
    </div>
  );
};
export default MyProfile;
