import Breadcrumbs from "@/components/common/Breadcrumb";
import InformationCreateEditor from "@/components/informations/write/InformationCreateEditor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "정보 등록하기",
  description: "Solitour의 정보 등록하기 페이지",
};

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center">
      <Breadcrumbs
        categories={[
          {
            label: "정보",
            href: "/informations/list?page=1&parentCategoryId=1",
          },
          { label: "정보 등록하기", href: "" },
        ]}
      />
      <InformationCreateEditor />
    </div>
  );
}
