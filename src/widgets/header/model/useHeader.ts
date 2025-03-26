"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { usePreventBodyScroll, useThrottle } from "@/shared/lib/hooks";
import { getUserInfo, useUserStore } from "@/entities/user";
import { fetchWithAuth } from "@/shared/api";

export const useHeader = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const { id, setUserState: setUser } = useUserStore();

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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    // 자동 로그인
    (async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo.userStatus === "대기") {
          await fetchWithAuth("/api/auth/logout", { method: "POST" });
          setUser({ id: -1 });
        } else {
          setUser(userInfo);
        }
      } catch (error) {
        await fetchWithAuth("/api/auth/logout", { method: "POST" });
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
