import { MyPageHeader } from "./MyPageHeader";
import { MyPageItemList } from "./MyPageItemList";

interface MyPagePageProps {
  mainCategory: "정보" | "모임";
}

export const MyPagePage = ({ mainCategory }: MyPagePageProps) => {
  return (
    <main className="flex min-h-[calc(100vh-25rem)] w-full flex-col pb-[2.5rem]">
      <MyPageHeader />
      <MyPageItemList defaultActiveIndex={mainCategory === "정보" ? 0 : 1} />
    </main>
  );
};
