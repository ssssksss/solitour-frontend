import Image from "next/image";
import { RefObject } from "react";

interface IMyPageHeaderProps {
  imageUploadRef: RefObject<HTMLInputElement>;
  onDragEnter: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
  imageUrl: string;
  onChangeImageUploadInputHandler: (e: any) => void;
}
interface IDummyData {
  user_id?: number,
  user_status_id?: string,
  user_oauth_id?: string,
  user_nickname?: string,
  user_age?: number | null,
  user_sex?: string | null,
  user_email?: string | null,
  user_phone_number?: string | null,
  user_image?: string,
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
}


const MyPageHeader = (props: IMyPageHeaderProps) => {
  return (
    <div className={"flex w-full max-w-[60rem] flex-col"}>
      <h1 className={"text-3xl font-semibold"}> 마이페이지 </h1>
      <div className={"flex items-center justify-center pb-[5rem] pt-[6.5rem]"}>
        <article className={"flex flex-col items-center"}>
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
              <div className="w-[1.25rem] h-[1.25rem] relative">
              <Image
                  src={"/edit-icon.svg"}
                  alt={"edit-icon-image"}
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
          <div className={"text-2xl font-semibold text-[#111]"}>
            {dummyData.user_nickname}
          </div>
          <div className={"text-[#666]"}> {dummyData.user_email} </div>
        </article>
      </div>
    </div>
  );
};
export default MyPageHeader