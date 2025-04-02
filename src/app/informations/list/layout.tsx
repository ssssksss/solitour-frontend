import { InformationBanner } from "@/widgets/informationBanner";
import { TopInformationTitleListWrapper } from "@/widgets/topInformationTitleListWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "정보",
  description: "Solitour의 정보 목록 페이지",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col items-center">
      <InformationBanner />
      <div className="mt-105 max-[744px]:mt-124" />
      <TopInformationTitleListWrapper />
      {children}
    </div>
  );
}
