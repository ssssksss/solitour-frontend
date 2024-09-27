import MyPageHeader from "@/components/mypage/MyPageHeader";
import { userResponseDto } from "@/types/UserDto";

interface IMyPageHeaderContainer {
  userInfo: userResponseDto;
}
const MyPageHeaderContainer = (props: IMyPageHeaderContainer) => {
  return (
    <>
      <MyPageHeader userInfo={props.userInfo} />
    </>
  );
};
export default MyPageHeaderContainer;
