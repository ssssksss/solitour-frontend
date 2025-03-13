"use client";

import useAuthStore from "@/stores/authStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import usePreventBodyScroll from "../../../shared/lib/hooks/usePreventBodyScroll";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useThrottle } from "@/shared/lib/hooks";

export const useHeader = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const { id, setUser } = useAuthStore();

  const handleScroll = useThrottle(() => {
    if (window.scrollY >= 500) {
      setIsTransparent(false);
    } else {
      setIsTransparent(true);
    }
  }, 100);

  const handleMenuClick = () => {
    setVisible(true);
  };

  const handleCloseButton = () => {
    setVisible(false);
  };

  usePreventBodyScroll(visible);

  useEffect(() => {
    // 모달창이 열린 상태로 새로고침을 하게되는 경우 히스토리 스택을 제거하기 위해서 뒤로가기 실행
    if (localStorage.getItem("isModal")) {
      history.back();
      localStorage.removeItem("isModal");
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    // 자동 로그인
    (async () => {
      try {
        const res = await fetchWithAuth("/api/auth/user");
        if (res.status === 200) {
          const data = await res.json();
          // 유저 상태가 '대기'인 경우는 쿠키를 제거하기 위해 로그아웃 처리
          if (data.userStatus === "대기") {
            await fetchWithAuth("/api/auth/logout", { method: "POST" });
            setUser({ id: -1 });
          } else {
            setUser(data);
          }
          return;
        }
        setUser({ id: -1 });
      } catch {
        setUser({ id: -1 });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    id,
    pathname,
    visible,
    isTransparent,
    handleMenuClick,
    handleCloseButton,
  };
};
