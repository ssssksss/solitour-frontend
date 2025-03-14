import Breadcrumbs from "@/shared/ui/breadcrumb/Breadcrumbs";
import DiaryCreateEditor from "@/components/diary/write/DiaryCreateEditor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "일기 등록하기",
  description: "Solitour의 여행 일기 등록 페이지",
};

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center">
      <Breadcrumbs
        categories={[
          { label: "여행 일기", href: "/diary/list?page=1" },
          { label: "일기 등록하기", href: "" },
        ]}
      />
      <DiaryCreateEditor />
    </div>
  );
}
