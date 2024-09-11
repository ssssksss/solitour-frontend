"use client";

import MyProfile from "@/components/mypage/MyProfile";
import useModalState from "@/hooks/useModalState";
import useToastifyStore from "@/store/toastifyStore";
import { userResponseDto } from "@/types/UserDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IMyProfileContainer {
  userInfo: userResponseDto;
}

const MyProfileContainer = ({userInfo}: IMyProfileContainer) => {
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [defaultNickname, setDefaultNickname] = useState(userInfo.nickname);
  const [message, setMessage] = useState("");
  const modalState = useModalState();
  const [userDeleteText, setUserDeleteText] = useState("");
  const router = useRouter();
  const toastifyStore = useToastifyStore();

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

  const changeUserDeleteText = (value: string) => {
    setUserDeleteText(value);
  }

  const userDeleteHandler = async () => {

    const response = await fetchWithAuth("/api/auth/user", {
      method: "DELETE",
      "Content-Type": "application/json",
    });

    if (response.ok) {
      toastifyStore.setToastify({
        type: "success",
        message: "회원탈퇴에 성공했습니다."
      })
      router.push("/");
    }

      toastifyStore.setToastify({
        type: "error",
        message: "회원탈퇴에 실패했습니다.",
      });
  }


  return (
    <MyProfile
      userInfo={userInfo}
      submitChangeNicknameHandler={submitChangeNicknameHandler}
      nickname={nickname}
      changeNickname={changeNickname}
      defaultNickname={defaultNickname}
      message={message}
      modalState={modalState}
      changeUserDeleteText={changeUserDeleteText}
      userDeleteText={userDeleteText}
      userDeleteHandler={userDeleteHandler}
    />
  );
};
export default MyProfileContainer;
