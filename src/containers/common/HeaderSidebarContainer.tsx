"use client";

import HeaderSidebar from "@/components/common/HeaderSidebar";
import useAuthStore from "@/store/authStore";
import { debounce } from "@/utils/debounc";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  onClose: () => void;
}

const HeaderSidebarContainer = ({ onClose }: Props) => {
  const [hoverNum, setHoverNum] = useState<number>(0);
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

  useEffect(() => {
    const handleResize = debounce(() => {
      if (window.innerWidth > 745) {
        onClose();
      }
    }, 100);

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
      setHoverNum={setHoverNum}
      logoutHandler={logoutHandler}
      onClose={onClose}
    />
  );
};

export default HeaderSidebarContainer;
