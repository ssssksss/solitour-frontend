import { User } from "@/entities/user";
import { MyPageUserImage } from "./MyPageUserImage";
import { MyPageNicknameEditor } from "@/features/myPageNicknameEditor";
import { DeleteAccount } from "@/features/deleteAccount";
import { MyPageEmail } from "./MyPageEmail";
import { MyPageLinkedAccount } from "./MyPageLinkedAccount";

interface MyPageProfileProps {
  userInfo: User;
}

export const MyPageProfileEditor = ({ userInfo }: MyPageProfileProps) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">프로필 설정</h1>
      <MyPageUserImage
        userImageUrl={userInfo.userImage.address}
        userSex={userInfo.sex}
      />
      <article className="mt-4 flex flex-col gap-y-[2.375rem]">
        <MyPageNicknameEditor initialNickname={userInfo.nickname} />
        <MyPageEmail email={userInfo.email} />
        <MyPageLinkedAccount
          provider={userInfo.provider}
          createdDate={userInfo.userImage.createdDate}
        />
      </article>
      <DeleteAccount />
    </div>
  );
};
