"use client";

import Header from "@/components/common/Header";
import useAuthStore from "@/store/authStore";
import { userResponseDto } from "@/dtos/UserDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

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
    authStore.setUser({
      id: -1,
    });
    await fetch("/api/auth/logout");
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useLayoutEffect(() => {
    // 자동 로그인
    const login = async () => {
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
      userId={authStore.id}
      logoutHandler={logoutHandler}
    />
  );
};

export default HeaderContainer;
