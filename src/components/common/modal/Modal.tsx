"use client";

import useOutsideClick from "@/shared/lib/hooks/useOutsideClick";
import usePreventBodyScroll from "@/shared/lib/hooks/usePreventBodyScroll";
import { ModalState } from "@/types/ModalState";
import React, { useEffect, useRef, useState, type JSX } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

interface ModalProps extends React.PropsWithChildren {
  className?: React.HTMLProps<HTMLElement>["className"];
  modalState: ModalState;
}

export const Modal = ({ children, modalState }: ModalProps) => {
  const [documentBody, setDocumentBody] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  let flag = modalState.isOpen;
  usePreventBodyScroll(modalState.isOpen);

  useEffect(() => {
    setDocumentBody(document.body);
  }, []);

  useOutsideClick(ref, () => {
    modalState.closeModal();
  });

  const handlePopState = () => {
    flag = false;
    if (modalState.isOpen) {
      modalState.closeModal();
    }
  };

  const handleBeforeUnload = () => {
    // 모달창이 열린 상태로 새로고침을 하게되면 나중에 헤더에서 뒤로가기를 실행하는 용도로 사용
    if (modalState.isOpen) {
      window.history.back();
      //   localStorage.setItem("isModal", "true");
    }
  };

  useEffect(() => {
    if (modalState.isOpen) {
      history.pushState({ isModal: true }, "");
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      if (flag) {
        window.history.back();
      }
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState.isOpen]);

  if (!documentBody || !modalState.isOpen) return null;

  const childrenArray = React.Children.toArray(children);
  const childComponent = childrenArray.map((child, index) => {
    if (index === 0 && React.isValidElement(child)) {
      // child의 props를 변경하려면 React.cloneElement 사용
      return React.cloneElement(
        child as React.ReactElement<{
          closeModal: () => void;
          closeButtonComponent: JSX.Element;
        }>,
        {
          closeModal: modalState.closeModal,
          closeButtonComponent: (
            <button
              onClick={() => modalState.closeModal()}
              className="absolute right-[2rem] top-[2rem] h-[2rem] w-[2rem] scale-100 transform transition-transform duration-300"
              style={{ zIndex: 200 }}
            >
              <MdClose
                className="bg-red-60 cursor-pointer text-gray2 hover:text-main"
                size={"2.5rem"}
                onClick={() => {
                  modalState.closeModal();
                }}
              />
            </button>
          ),
        },
      );
    }
    return child;
  });

  return createPortal(
    <div
      className="fixed inset-0 flex h-full w-full items-center justify-center"
      style={{ zIndex: "100" }}
    >
      <div className="absolute h-full w-full cursor-pointer bg-black/30"></div>
      <div
        ref={ref}
        className="-z-1 relative flex h-[calc(100vh-1rem)] w-full flex-col items-center justify-center"
        onClick={(e) => {
          if (e.target == ref.current) {
            modalState.closeModal();
          }
        }}
      >
        {childComponent}
        {/* {children} */}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement,
  );
};
