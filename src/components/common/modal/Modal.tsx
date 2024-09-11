import useOutsideClick from "@/hooks/useOutsideClick";
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  className?: React.HTMLProps<HTMLElement>["className"];
  onClose: () => void;
  isHeaderBar?: boolean;
  headerBarStyle?: string;
}

export const Modal = ({ isOpen, children, onClose, isHeaderBar, headerBarStyle = "bg-white" }: ModalProps) => {
  const [documentBody, setDocumentBody] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  let flag = isOpen;
  usePreventBodyScroll(isOpen);

  useEffect(() => {
    setDocumentBody(document.body);
  }, []);

  useOutsideClick(ref, () => {
    onClose();
  });

  const handlePopState = () => {
    flag = false;
    if (isOpen) {
      onClose();
    }
  };

  const handleBeforeUnload = () => {
    // 모달창이 열린 상태로 새로고침을 하게되면 나중에 헤더에서 뒤로가기를 실행하는 용도로 사용
    localStorage.setItem("isModal", "true");
  };

  useEffect(() => {
    if (isOpen) {
      history.pushState({isModal: true}, "");
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      if (flag) {
        window.history.back();
        flag = false;
      }
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isOpen]);

  if (!documentBody || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex h-full w-full items-center justify-center"
      style={{ zIndex: "100" }}
    >
      <div className="absolute h-full w-full bg-black/30 cursor-pointer"></div>
      <div
        ref={ref}
        className="relative flex flex-col items-center justify-center"
      >
        {isHeaderBar && (
          <div className={`flex h-[3rem] w-full justify-end ${headerBarStyle}`}>
            <button
              onClick={() => onClose()}
              className="transform-origin-center mr-[.5rem] mt-[1rem] h-[2rem] w-[2rem] scale-100 transform transition-transform duration-300 hover:scale-150"
            >
              <Image
                src={"/close-icon.svg"}
                alt={"close-icon"}
                width={20}
                height={20}
              />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement,
  );
};
