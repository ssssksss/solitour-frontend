"use client";

import MyBoard from "@/components/mypage/MyBoard";
import { useState } from "react";
import MyBoardListContainer from "./MyBoardListContainer";

const menu = ["전체", "정보", "모임"];

const MyBoardContainer = () => {
  const [activeBoardMenuIndex, setActiveBoardMenuIndex] = useState(0);
  const onClickMenu = (index: number) => {
    setActiveBoardMenuIndex(index);
  };

  return (
    <>
      <MyBoard
        menu={menu}
        onClickMenu={onClickMenu}
        activeBoardMenuIndex={activeBoardMenuIndex}
      />
      <MyBoardListContainer activeBoardMenuIndex={activeBoardMenuIndex} />
    </>
  );
};
export default MyBoardContainer;
