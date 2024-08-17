"use client";

import MyProfile from "@/components/mypage/MyProfile";
import { userResponseDto } from "@/types/UserDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { ChangeEvent, useRef, useState } from "react";

interface IMyProfileContainer {
  userInfo: userResponseDto;
}

const MyProfileContainer = ({userInfo}: IMyProfileContainer) => {
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [, setIsDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState("/");
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [defaultNickname, setDefaultNickname] = useState(userInfo.nickname);
  const [message, setMessage] = useState("");
  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    const file = e.dataTransfer.files?.[0];
    e.preventDefault();
    e.stopPropagation();
    if (!file) {
      alert("파일이 없습니다!");
      return;
    }
    const result = URL.createObjectURL(file);
    setImageUrl(result);
    setIsDragging(false);
  };
  const onChangeImageUploadInputHandler = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("파일이 없습니다!");
      return;
    }
    const result = URL.createObjectURL(file);
    setImageUrl(result);
  };
  const submitChangeNicknameHandler = async () => {
    if (nickname == "" && nickname == defaultNickname) return;
    const res = await fetchWithAuth("/api/mypage/change-nickname", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
      body: JSON.stringify({ nickname: nickname }),
    })

    const data = await res.json();
    if (data.status == 200) {
      setDefaultNickname(nickname);
      setMessage("성공");
    } else {
      setMessage("실패");
    }
  }
  
  const changeNickname = (value: string) => {
    setNickname(value);
    setMessage("");
  }


  return (
    <MyProfile
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      imageUploadRef={imageUploadRef}
      imageUrl={imageUrl}
      onChangeImageUploadInputHandler={onChangeImageUploadInputHandler}
      userInfo={userInfo}
      submitChangeNicknameHandler={submitChangeNicknameHandler}
      nickname={nickname}
      changeNickname={changeNickname}
      defaultNickname={defaultNickname}
      message={message}
    />
  );
};
export default MyProfileContainer;
