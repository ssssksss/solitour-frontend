import { ReactNode } from "react";

interface ModalTemplateProps {
  className?: string;
  children?: ReactNode;
}

const ModalTemplate = ({ className, children }: ModalTemplateProps) => {
  return (
    <section
      className={[
        `${className}`,
        "scrollbar-hide relative flex max-h-[calc(100vh-1rem)] w-full flex-col items-center overflow-y-scroll rounded-[1rem] bg-white px-[2.75rem] pb-[2rem] pt-[4rem]",
      ].join(" ")}
    >
      {children}
    </section>
  );
};

export default ModalTemplate;
