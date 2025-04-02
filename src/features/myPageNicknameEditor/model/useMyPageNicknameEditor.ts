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

    try {
      setLoading(true);
      await updateNickname(nickname);
      setUserState({ nickname });
      setDefaultNickname(nickname);
      setMessage("성공");
    } catch (error) {
      setMessage("실패");
    } finally {
      setLoading(false);
    }
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
