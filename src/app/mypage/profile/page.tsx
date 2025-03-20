import { getUserInfo } from "@/entities/user";
import { MyPageProfileEditor } from "@/widgets/myPageProfileEditor";
import { Breadcrumbs } from "@/shared/ui/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로필 설정",
  description: "Solitour 사용자 마이페이지-프로필 설정",
};

export default async function Page() {
  const userInfo = await getUserInfo();

  return (
    <main className="flex min-h-[calc(100vh-25rem)] w-full flex-col px-2 pb-10">
      <Breadcrumbs
        categories={[
          {
            label: "마이페이지",
            href: "/mypage?mainCategory=정보&category=owner",
          },
          { label: "프로필 설정", href: "" },
        ]}
      />
      <MyPageProfileEditor userInfo={userInfo} />
    </main>
  );
}
