import PointCategoryList from "@/components/point/PointCategoryList";
import PointInfo from "@/components/point/PointInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "포인트",
  description: "포인트 정보 페이지",
};

export default function PointLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full flex-col gap-0">
      <PointInfo />
      <PointCategoryList />
      {children}
    </div>
  );
}
