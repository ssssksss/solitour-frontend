import { useUserStore } from "@/entities/user";
import { useThrottle } from "@/shared/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useHeaderSidebar = (onClose: () => void) => {
  const [hoverNum, setHoverNum] = useState(0);
  const { id, initialize } = useUserStore();
  const router = useRouter();

  const handleLogout = async () => {
    // api로 로그아웃 요청해서 쿠키제거
    initialize();
    await fetch("/api/auth/logout", { method: "POST" });
    onClose();
    router.push("/");
    router.refresh();
  };

  const handleResize = useThrottle(() => {
    if (window.innerWidth > 745) {
      onClose();
    }
  }, 100);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return { id, hoverNum, setHoverNum, handleLogout };
};
