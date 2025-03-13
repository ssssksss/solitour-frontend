"use client";

import { useState } from "react";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { UserResponseDto } from "@/types/UserDto";
import useModalState from "@/shared/lib/hooks/useModalState";

export const useMyPageProfile = (userInfo: UserResponseDto) => {
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [defaultNickname, setDefaultNickname] = useState(userInfo.nickname);
  const [message, setMessage] = useState("");
  const modalState = useModalState();

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setMessage("");
  };

  const handleSubmit = async () => {
    if (nickname === "" && nickname === defaultNickname) {
      return;
    }

    const res = await fetchWithAuth("/api/mypage/change-nickname", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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

  return {
    nickname,
    defaultNickname,
    message,
    modalState,
    handleNicknameChange,
    handleSubmit,
  };
};
