import GatheringCreateEditor from "@/components/gathering/write/GatheringCreateEditor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "모임 등록하기",
  description: "Solitour의 모임 등록하기 페이지",
};

export default function Page() {
  return (
    <div className={"min-h-[calc(100vh-25rem)] w-full pb-[2rem]"}>
      <GatheringCreateEditor />
    </div>
  );
}
