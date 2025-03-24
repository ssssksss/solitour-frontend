import { MyPageHeader } from "@/widgets/myPageHeader";
import { MyPageItemList } from "@/widgets/myPageItemList";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "Solitour 사용자 마이페이지",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { mainCategory, category } = await searchParams;

  if (
    (mainCategory !== "정보" && mainCategory !== "모임") ||
    category === undefined
  ) {
    notFound();
  }

  return (
    <main className="flex min-h-[calc(100vh-25rem)] w-full flex-col pb-10">
      <MyPageHeader />
      <MyPageItemList defaultActiveIndex={mainCategory === "정보" ? 0 : 1} />
    </main>
  );
}
