import PagePath from "@/components/common/PagePath";
import DiaryEditorContainer from "@/containers/diary/write/DiaryEditorContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "일기 등록하기",
  description: "Solitour의 여행 일기 등록 페이지",
};

export default function page() {
  return (
    <div className="flex w-full flex-col items-center">
      <PagePath first="여행 일기" second="일기 등록하기" />
      <DiaryEditorContainer />
    </div>
  );
}
