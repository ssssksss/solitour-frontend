import Image from "next/image";
import Link from "next/link";
import { RefObject } from "react";

interface IMyProfileProps {
  imageUploadRef: RefObject<HTMLInputElement>;
  onDragEnter: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
  imageUrl: string;
  onChangeImageUploadInputHandler: (e: any) => void;
}
interface IDummyData {
  user_id?: number;
  user_status_id?: string;
  user_oauth_id?: string;
  user_nickname?: string;
  user_age?: number | null;
  user_sex?: string | null;
  user_email?: string | null;
  user_phone_number?: string | null;
  user_image?: string;
  // is_admin: boolean,
}

const dummyData: IDummyData = {
  user_id: 1,
  user_status_id: "1",
  user_oauth_id: "1",
  user_nickname: "하몽님",
  user_age: 20,
  user_sex: "woman",
  user_email: "sola240@gmail.com",
  user_phone_number: "010-1234-5678",
  // user_image: null,
};

const MyProfile = (props: IMyProfileProps) => {
  return (
    <div className={"flex w-full max-w-[60rem] flex-col"}>
      <div className="flex gap-[.25rem] text-[.625rem] text-gray2">
        <div className="text-gray1">
          <Link href={"/"}>
            <Image
              src={"/home-icon.svg"}
              alt={"home-icon-image"}
              width={10}
              height={10}
            />
          </Link>
        </div>
        <div> {">"} </div>
        <div>
          <Link href={"/mypage"}> 마이페이지 </Link>
        </div>
        <div> {">"} </div>
        <div className={"font-bold text-gray1"}> 프로필 설정 </div>
      </div>
      <h1 className={"pt-[2.25rem] text-3xl font-semibold"}> 프로필 설정 </h1>
      <article
        className={"flex items-center justify-center pb-[5.25rem] pt-[4.25rem]"}
      >
        <div className={"flex flex-col items-center"}>
          <label
            className={
              "relative mb-[1rem] aspect-square w-[6.75rem] cursor-pointer rounded-[3rem] bg-[#F2FAF7] outline outline-[1px] outline-offset-[1px] outline-[#B8EDD9]"
            }
            htmlFor={"imageUpload"}
            onDragEnter={props.onDragEnter}
            onDragLeave={props.onDragLeave}
            onDragOver={props.onDragOver}
            onDrop={props.onDrop}
          >
            {/* ? 유저의 썸네일 이미지가 있는지? */}
            {/* ? 썸네일 이미지가 없다면 남자인지 여자인지? => 만약에 성별을 선택안하게 되면 어떻게 해야할지? */}
            {props.imageUrl != "/" ? (
              <Image
                src={props.imageUrl}
                alt={"user_image"}
                width={108}
                height={108}
              />
            ) : dummyData.user_sex == "man" ? (
              <Image
                src={"/user_sex_man_default_image.svg"}
                alt={"user_image"}
                width={108}
                height={108}
              />
            ) : (
              <Image
                src={"/user_sex_woman_default_image.svg"}
                alt={"user_image"}
                width={108}
                height={108}
              />
            )}
            <div
              className={
                "absolute bottom-0 right-0 flex aspect-square w-[2.375rem] items-center justify-center rounded-[50%] bg-[#F4F4F4]"
              }
            >
              <div className="relative h-[1.25rem] w-[1.25rem]">
                <Image
                  src={"/camera-icon.svg"}
                  alt={"camera-icon-image"}
                  fill
                />
              </div>
            </div>
            <input
              type={"file"}
              id={"imageUpload"}
              ref={props.imageUploadRef}
              className="hidden"
              onChange={(e) => props.onChangeImageUploadInputHandler(e)}
              // TODO : 어떤 이미지 타입들을 받아올지 정해놓아야 한다.
            />
          </label>
        </div>
      </article>
      <div className={"flex flex-col"}>
        <article>
          <div className={"flex w-full items-center gap-x-[2.375rem]"}>
            <div className={"relative flex-shrink-0"}>
              <span className={"w-[3.5rem] text-lg font-semibold"}>닉네임</span>
              <span className="absolute top-[-.5rem] text-lg text-main">*</span>
            </div>
            <input
              disabled={true}
              placeholder="닉네임을 입력해주세요"
              className="h-[3.25rem] w-full rounded-[28px] pl-[2rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
            />
          </div>
          <div
            className={"flex w-full justify-end pt-[.75rem] text-sm text-gray1"}
          >
            0/50
          </div>
        </article>
        <article className={"pt-[2.375rem]"}>
          <div className={"flex w-full items-center gap-x-[2.375rem]"}>
            <div className={"relative flex-shrink-0"}>
              <span className={"w-[3.5rem] text-lg font-semibold"}>이메일</span>
              <span className="absolute top-[-.5rem] text-lg text-main">*</span>
            </div>
            <input
              disabled={true}
              placeholder="이메일을 입력해주세요"
              className="h-[3.25rem] w-full rounded-[28px] pl-[2rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
            />
          </div>
        </article>
        <article className={"pt-[4.25rem]"}>
          <div
            className={
              "grid h-[2.5rem] w-full grid-cols-[6rem_auto] gap-x-[1.75rem]"
            }
          >
            <div className={"flex items-center text-lg font-semibold"}>
              연동된 계정
            </div>
            <div className={"flex items-center justify-between"}>
              <span> 카카오톡 </span>
              <div className={"flex items-center gap-x-[.875rem]"}>
                <span className={"font-medium text-gray1"}> 2024.06.01 </span>
                <div className="relative flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[18px] bg-[#FEE501]">
                  <Image
                    src={"/kakao-icon.svg"}
                    alt={"kakao-icon-image"}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
export default MyProfile;
