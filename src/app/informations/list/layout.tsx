import TopList from "@/components/common/TopList";
import TopListSkeleton from "@/components/skeleton/common/TopListSkeleton";
import BannerContainer from "@/containers/common/BannerContainer";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center">
      <BannerContainer />
      <Suspense fallback={<TopListSkeleton title="여행" />}>
        <TopList title="여행" />
      </Suspense>
      {children}
    </div>
  );
}
