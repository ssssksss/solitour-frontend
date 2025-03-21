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
        `${className}`,
        "scrollbar-hide relative flex max-h-[calc(100vh-1rem)] w-full flex-col items-center overflow-y-scroll rounded-2xl bg-white px-11 pt-16 pb-8",
      ].join(" ")}
    >
      <MdClose
        className="text-gray2 hover:text-main absolute top-6 right-6 cursor-pointer"
        size="2rem"
        onClick={() => closeModal()}
      />
      {children}
    </section>
  );
};
