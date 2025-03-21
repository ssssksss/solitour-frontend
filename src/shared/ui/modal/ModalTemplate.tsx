import { ReactNode } from "react";

interface ModalTemplateProps {
  className?: string;
  children?: ReactNode;
}

export const ModalTemplate = ({ className, children }: ModalTemplateProps) => {
  return (
    <section
      className={[
        `${className}`,
        "scrollbar-hide relative flex max-h-[calc(100vh-1rem)] w-full flex-col items-center overflow-y-scroll rounded-2xl bg-white px-11 pt-16 pb-8",
      ].join(" ")}
    >
      {children}
    </section>
  );
};
