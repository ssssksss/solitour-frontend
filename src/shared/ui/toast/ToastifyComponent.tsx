"use client";

import { useToastifyStore } from "@/shared/model";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastifyComponent = () => {
  const { type, message, count } = useToastifyStore();

  useEffect(() => {
    if (message === "") {
      return;
    }

    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "default":
        toast(message);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div className="fixed z-50 w-full translate-y-16 text-base">
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick={true}
        rtl={false} // 알림 좌우 반전
        closeButton={true}
        pauseOnFocusLoss={false} // 화면을 벗어나면 알람 정지
        draggable={true} // 드래그 가능
        pauseOnHover={false} // 마우스를 올리면 알람 정지
        limit={3} // 알람 개수 제한
        theme="colored"
      />
    </div>
  );
};
