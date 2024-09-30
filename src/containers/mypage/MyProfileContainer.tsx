"use client";

import MyProfile from "@/components/mypage/MyProfile";
import useModalState from "@/hooks/useModalState";
import { userResponseDto } from "@/types/UserDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useState } from "react";

interface IMyProfileContainer {
  userInfo: userResponseDto;
}

const MyProfileContainer = ({ userInfo }: IMyProfileContainer) => {
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [defaultNickname, setDefaultNickname] = useState(userInfo.nickname);
  const [message, setMessage] = useState("");
  const modalState = useModalState();
  
  const submitChangeNicknameHandler = async () => {
    if (nickname == "" && nickname == defaultNickname) return;
    const res = await fetchWithAuth("/api/mypage/change-nickname", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname: nickname }),
    });

    const data = await res.json();
    if (data.status == 200) {
      setDefaultNickname(nickname);
      setMessage("성공");
    } else {
      setMessage("실패");
    }
  };

  const changeNickname = (value: string) => {
    setNickname(value);
    setMessage("");
  };

  return (
    <>
      <MyProfile
        userInfo={userInfo}
        submitChangeNicknameHandler={submitChangeNicknameHandler}
        nickname={nickname}
        changeNickname={changeNickname}
        defaultNickname={defaultNickname}
        message={message}
        modalState={modalState}
      />
    </>
  );
};
export default MyProfileContainer;
