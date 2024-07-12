"use client";

import Header from "@/components/common/Header";
import useAuthStore from "@/store/authStore";
import { userResponseDto } from "@/types/UserDto";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HeaderContainer = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState<boolean>(false);
  const [transparent, setTransparent] = useState<boolean>(true);
  const authStore = useAuthStore();
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
    authStore.initialize();
    await fetch("/api/auth/logout");
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const login = async () => {
      const user = await fetch("/api/auth/user", {
        credentials: "include",
      });
      user.json().then((res: userResponseDto) => {
        authStore.setUser(res);
      });
    };
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Header
      pathname={pathname}
      visible={visible}
      transparent={transparent}
      onMenuClicked={onMenuClicked}
      onClose={onClose}
      nickName={authStore.nickname}
      logoutHandler={logoutHandler}
    />
  );
};

export default HeaderContainer;
