"use client";

import MyBookmark from "@/components/mypage/MyBookmark";
import { useState } from "react";
import MyBookmarkListContainer from "./MyBookmarkListContainer";

const menu = ["내가 만든 모임", "내가 신청한 모임", "북마크"];

const MyBookmarkContainer = () => {
  const [activeBookmarkMenuIndex, setActiveBookmarkMenuIndex] = useState(0);
  const onClickMenu = (index: number) => {
    setActiveBookmarkMenuIndex(index);
  };

  return (
    <>
      <MyBookmark
        menu={menu}
        onClickMenu={onClickMenu}
        activeBookmarkMenuIndex={activeBookmarkMenuIndex}
      />
      <MyBookmarkListContainer
        activeBookmarkMenuIndex={activeBookmarkMenuIndex}
      />
    </>
  );
};
export default MyBookmarkContainer;
