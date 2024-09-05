import useOutsideClick from "@/hooks/useOutsideClick";
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  className?: React.HTMLProps<HTMLElement>["className"];
  onClose: () => void;
}

export const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  const [documentBody, setDocumentBody] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDocumentBody(document.body);
  }, []);

  useOutsideClick(ref, () => {
    onClose();
  });

  usePreventBodyScroll(isOpen);

  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        onClose();
      }
    };
    // 뒤로가기 버튼을 눌렀을 때 실행되는 함수
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      history.pushState(null, "");
    }
  }, [isOpen]);

  if (!documentBody || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex h-full w-full items-center justify-center"
      style={{ zIndex: "100" }}
    >
      <div className="absolute h-full w-full bg-black/30"></div>
      <div
        ref={ref}
        className="flex h-full items-center justify-center pb-[1rem] pt-[1rem]"
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement,
  );
};
