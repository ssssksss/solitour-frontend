import GatheringEditorContainer from "@/containers/meetings/write/GatheringEditorContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "모임 등록하기",
  description: "Solitour의 모임 등록하기 페이지",
};

export default function page() {
  return (
    <div       className={
        "flex w-full flex-col items-center px-[.5rem] pb-[2rem] pt-[2rem] lg:px-[0rem] min-h-[calc(100vh-25rem)] max-w-[60rem] m-auto"
      }>
      <GatheringEditorContainer />
    </div>
  );
}
