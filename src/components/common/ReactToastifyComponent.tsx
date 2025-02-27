import useToastifyStore from "@/stores/toastifyStore";
import { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReactToastifyComponent = () => {
  const toastifyStore = useToastifyStore();
  const isMounted = useRef(true);
  const notify = () => {
    switch (toastifyStore.type || "default") {
      case "success":
        toast.success(toastifyStore.message);
        break;
      case "error":
        toast.error(toastifyStore.message);
        break;
      case "warning":
        toast.warning(toastifyStore.message);
        break;
      case "info":
        toast.info(toastifyStore.message);
        break;
      case "default":
        toast(toastifyStore.message);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (toastifyStore.message == "") return;
    if (isMounted.current) notify();
    else isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastifyStore]);

  return (
    <div className="fixed z-50 w-full translate-y-[4rem] text-[1rem]">
      <ToastContainer
        position={"top-right"} // 알람 위치 지정
        autoClose={1000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        // closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        closeButton={true}
        // pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover={true} // 마우스를 올리면 알람 정지
        limit={3} // 알람 개수 제한\
        theme={"colored"}
        // className={"translate-y-[4rem] w-full relative flex justify-end"}
      />
    </div>
  );
};
export default ReactToastifyComponent;
