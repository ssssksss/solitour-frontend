"use client";

import Header from "@/components/common/Header";
import useAuthStore from "@/store/authStore";
import { userResponseDto } from "@/types/UserDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeaderContainer = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState<boolean>(false);
  const [transparent, setTransparent] = useState<boolean>(true);
  const authStore = useAuthStore();
  const router = useRouter();

  const onScroll = () => {
    if (window.scrollY >= 500) {
      setTransparent(false);
    } else {
      setTransparent(true);
    }
  };

  const onMenuClicked = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const logoutHandler = async () => {
    // api로 로그아웃 요청해서 쿠키제거
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    authStore.initialize();
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    // 모달창이 열린 상태로 새로고침을 하게되는 경우 히스토리 스택을 제거하기 위해서 뒤로가기 실행
    if (localStorage.getItem("isModal")) {
      history.back();
      localStorage.removeItem("isModal");
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    // 자동 로그인
    const login = async () => {
      try {
        const data = await fetchWithAuth("/api/auth/user");
        if (data.status == 200) {
          data.json().then((res: userResponseDto) => {
            authStore.setUser(res);
          });
        } else {
          authStore.setUser({
            id: -1,
          });
        }
      } catch {
        authStore.setUser({
          id: -1,
        });
      }
    };
    login();
  }, []);

  return (
    <Header
      pathname={pathname}
      visible={visible}
      transparent={transparent}
      onMenuClicked={onMenuClicked}
      onClose={onClose}
      userId={authStore.id}
      userSex={authStore.sex}
      userProfile={authStore.userImage.address}
      logoutHandler={logoutHandler}
    />
  );
};

export default HeaderContainer;
