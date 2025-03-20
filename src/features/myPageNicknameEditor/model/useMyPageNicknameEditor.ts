"use client";

import { useState } from "react";
import { updateNickname } from "../api/nickname";
import { useUserStore } from "@/entities/user";

export const useMyPageNicknameEditor = (initialNickname: string) => {
  const { setUserState } = useUserStore();
  const [nickname, setNickname] = useState(initialNickname);
  const [defaultNickname, setDefaultNickname] = useState(initialNickname);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setMessage("");
  };

  const handleSubmit = async () => {
    if (nickname === "" || nickname === defaultNickname) {
      return;
    }

    setLoading(true);
    const result = await updateNickname(nickname);

    if (result === 200) {
      setUserState({ nickname });
      setDefaultNickname(nickname);
      setMessage("성공");
    } else {
      setMessage("실패");
    }
    setLoading(false);
  };

  return {
    nickname,
    defaultNickname,
    message,
    loading,
    handleNicknameChange,
    handleSubmit,
  };
};
