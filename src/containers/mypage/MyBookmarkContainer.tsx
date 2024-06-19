
'use client'

import MyBookmark from "@/components/mypage/MyBookmark";
import { useState } from "react";
import MyBookmarkListContainer from "./MyBookmarkListContainer";

const menu = ["전체", "정보", "모임"];

const MyBookmarkContainer = () => {
 
    const [activeBookmarkMenuIndex, setActiveBookmarkMenuIndex] = useState(0);
    const onClickMenu = (index: number) => {
        setActiveBookmarkMenuIndex(index);
    }

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
export default MyBookmarkContainer
