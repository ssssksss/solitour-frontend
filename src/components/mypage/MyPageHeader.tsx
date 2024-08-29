import { userResponseDto } from "@/types/UserDto";
import Image from "next/image";
import Link from "next/link";

interface IDummyData {
  user_id?: number;
  user_status_id?: string;
  user_oauth_id?: string;
  user_nickname?: string;
  user_age?: number | null;
  user_sex?: string | null;
  user_email?: string | null;
  user_phone_number?: string | null;
  user_image?: string | null;
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
  user_image: null,
};

interface IMyPageHeader {
  userInfo: userResponseDto;
}

const MyPageHeader = ({userInfo}:IMyPageHeader) => {
  return (
    <div className={"flex w-full max-w-[60rem] flex-col"}>
      <h1 className={"text-3xl font-semibold"}> 마이페이지 </h1>
      <div className={"flex items-center justify-center pb-[5rem] pt-[6.5rem]"}>
        <article className={"flex flex-col items-center"}>
          <div
            className={
              "relative mb-[1rem] aspect-square w-[6.75rem] rounded-[3rem] bg-[#F2FAF7] outline outline-[1px] outline-offset-[1px] outline-[#B8EDD9]"
            }
          >
            {/* ? 유저의 썸네일 이미지가 있는지? */}
            {/* ? 썸네일 이미지가 없다면 남자인지 여자인지? => 만약에 성별을 선택안하게 되면 어떻게 해야할지? */}
            {userInfo.userImage?.address ? (
              <Image
                src={userInfo.userImage?.address}
                alt={"user_image"}
                width={108}
                height={108}
                className="rounded-[3.875rem]"
              />
            ) : userInfo.sex == "MALE" ? (
              <Image
                src={"/user_sex_man_default_image.svg"}
                alt={"user_image"}
                width={108}
                height={108}
                className="rounded-[3.875rem]"
              />
            ) : (
              <Image
                src={"/user_sex_woman_default_image.svg"}
                alt={"user_image"}
                width={108}
                height={108}
                className="rounded-[3.875rem]"
              />
            )}
            <Link href="/mypage/profile">
              <div
                className={
                  "absolute bottom-0 right-0 flex aspect-square w-[2.375rem] items-center justify-center rounded-[50%] bg-[#F4F4F4]"
                }
              >
                <div className="relative h-[1.25rem] w-[1.25rem]">
                  <Image
                    src={"/setting-icon.svg"}
                    alt={"setting-icon-image"}
                    fill
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className={"text-2xl font-semibold text-[#111]"}>
            {userInfo.nickname}
          </div>
          <div className={"text-[#666]"}> {userInfo.email} </div>
        </article>
      </div>
    </div>
  );
};
export default MyPageHeader;
