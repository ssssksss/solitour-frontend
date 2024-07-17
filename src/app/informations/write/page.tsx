import PagePath from "@/components/common/PagePath";
import InformationEditorContainer from "@/containers/informations/write/InformationEditorContainer";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "정보 등록하기",
  description: "Solitour의 정보 등록하기 페이지",
};

export default function page() {
  const cookie = cookies().get("access_token");
  if (!cookie) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex flex-col items-center">
      <PagePath first="정보" second={"정보 등록하기"} />
      <InformationEditorContainer />
    </div>
  );
}
