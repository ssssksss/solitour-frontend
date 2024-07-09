import TabMenuContainer from "../common/TabMenuContainer";
import MyBoardContainer from "./MyBoardContainer";
import MyBookmarkContainer from "./MyBookmarkContainer";

const MyPageMainContainer = () => {
  return (
    <div className={"w-full max-w-[60rem]"}>
      <TabMenuContainer
        tabs={[
          { label: "내 게시물", content: <MyBoardContainer /> },
          { label: "북마크", content: <MyBookmarkContainer /> },
        ]}
      />
    </div>
  );
};
export default MyPageMainContainer;
