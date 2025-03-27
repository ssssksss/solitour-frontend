"use client";

import { ReactNode } from "react";
import { MdClose } from "react-icons/md";

interface ModalTemplateProps {
  className?: string;
  children?: ReactNode;
  closeModal: () => void;
}

export const ModalTemplate = ({
  className,
  children,
  closeModal,
}: ModalTemplateProps) => {
  return (
    <section
      className={[
        "scrollbar-hide relative flex max-h-[calc(100vh-1rem)] flex-col items-center overflow-y-scroll rounded-2xl bg-white pt-16",
        `${className}`,
      ].join(" ")}
    >
      <MdClose
        className="text-gray2 hover:text-main absolute top-6 right-6 cursor-pointer"
        size="2rem"
        onClick={() => {
          window.history.back();
          closeModal();
        }}
      />
      {children}
    </section>
  );
};
