
'use client'

import MyBookMarkFolderList from "@/components/mypage/MyBookMarkFolderList";
import MyBookmark from "@/components/mypage/MyBookmark";
import { useState } from "react";

const menu = ["전체", "정보", "모임"];

const MyBookmarkContainer = () => {
 
    const [activeBookmarkMenuIndex, setActiveBookmarkMenuIndex] = useState(0);
    const onClickMenu = (index: number) => {
        setActiveBookmarkMenuIndex(index);
    }

  return (
      <div className={"pb-[5rem]"}>
      <MyBookmark menu={menu} onClickMenu={onClickMenu} activeBookmarkMenuIndex={activeBookmarkMenuIndex} />
      <MyBookMarkFolderList />
      </div>

  );
};
export default MyBookmarkContainer
