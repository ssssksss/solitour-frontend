import GatheringCreateEditor from "@/components/gathering/write/GatheringCreateEditor";
import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "모임 등록하기",
  description: "Solitour의 모임 등록하기 페이지",
};

export default function Page() {
  return (
    <main className={"min-h-[calc(100vh-25rem)] w-full pb-[2rem]"}>
      <Breadcrumb
        categories={[
          { label: "모임", href: "/gathering" },
          { label: "모임 등록하기", href: "" },
        ]}
      />
      <GatheringCreateEditor />
    </main>
  );
}
