"use client";

import Header from "@/components/common/Header";
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import useAuthStore from "@/store/authStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const HeaderContainer = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState<boolean>(false);
  const [transparent, setTransparent] = useState<boolean>(true);
  const authStore = useAuthStore();

  usePreventBodyScroll(visible);

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
        const res = await fetchWithAuth("/api/auth/user");
        if (res.status == 200) {
          const data = await res.json();
          // 유저 상태가 '대기'인 경우는 쿠키를 제거하기 위해 로그아웃 처리
          if (data.userStatus == "대기") {
            await fetchWithAuth("/api/auth/logout", {
              method: "POST"
            });
            authStore.setUser({
              id: -1,
            });
          }
          else {
            authStore.setUser(data);
          }
          return;
        }
        authStore.setUser({
          id: -1,
        });
      } catch {
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
    />
  );
};

export default HeaderContainer;
