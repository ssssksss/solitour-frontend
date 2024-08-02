import TopList from "@/components/common/TopList";
import TopListSkeleton from "@/components/skeleton/common/TopListSkeleton";
import BannerContainer from "@/containers/common/BannerContainer";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "정보",
  description: "Solitour의 정보 목록 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col items-center">
      <BannerContainer />
      <div className="mt-[26.25rem] max-[744px]:mt-[31rem]" />
      <Suspense fallback={<TopListSkeleton title="여행" />}>
        <TopList title="여행" />
      </Suspense>
      {children}
    </div>
  );
}
