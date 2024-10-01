import { ReactNode } from "react";

interface IModalTemplate {
    className?: string;
    children?: ReactNode;
}
const ModalTemplate = (props: IModalTemplate) => {
  return (
    <section
      className={
        `rounded-[1rem] relative flex max-h-[calc(100vh-1rem)] w-full flex-col items-center overflow-y-scroll bg-white scrollbar-hide ${props.className} px-[2.75rem] pb-[2rem] pt-[4rem]`
      }
    >
      {props.children}
    </section>
  );
};
export default ModalTemplate;