import InformationEditorContainer from "@/containers/informations/write/InformationEditorContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "정보 등록하기",
  description: "Solitour의 정보 등록하기 페이지",
};

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <InformationEditorContainer />
    </div>
  );
}
