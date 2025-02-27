"use client";

import HeaderSidebar from "@/components/common/HeaderSidebar";
import { useDebounce } from "@/hooks/useDebounce";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  onClose: () => void;
}

const HeaderSidebarContainer = ({ onClose }: Props) => {
  const [hoverNum, setHoverNum] = useState<number>(0);
  const [animationFlag, setAnimationFlag] = useState(false);
  const { id, initialize } = useAuthStore();
  const router = useRouter();

  const logoutHandler = async () => {
    // api로 로그아웃 요청해서 쿠키제거
    initialize();
    await fetch("/api/auth/logout", { method: "POST" });
    onClose();
    router.push("/");
    router.refresh();
  };

  const closeWithFadeOut = async () => {
    setAnimationFlag(true);
    await new Promise((resolve) => setTimeout(resolve, 250));
    setAnimationFlag(false);
    onClose();
  };

  const handleResize = useDebounce(() => {
    if (window.innerWidth > 745) {
      onClose();
    }
  }, 100);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HeaderSidebar
      signedIn={Number(id) > 0}
      hoverNum={hoverNum}
      animationFlag={animationFlag}
      setHoverNum={setHoverNum}
      logoutHandler={logoutHandler}
      onClose={onClose}
      closeWithFadeOut={closeWithFadeOut}
    />
  );
};

export default HeaderSidebarContainer;
