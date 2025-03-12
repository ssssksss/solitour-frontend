import SupportHeader from "@/components/support/SupportHeader";
import SupportAbout from "@/components/support/about/SupportAbout";
import SupportFAQList from "@/components/support/faq/SupportFAQList";
import SupportTerms from "@/components/support/terms/SupportTerms";
import SupportNoticeList from "@/components/support/notice/SupportNoticeList";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const menu = (await searchParams).menu;

  if (menu === undefined) {
    throw Error("Not Found");
  }

  return (
    <div className="mb-8 w-full">
      <SupportHeader menu={menu} />
      {menu === "about" && <SupportAbout />}
      {menu === "notice" && <SupportNoticeList />}
      {menu === "faq" && <SupportFAQList />}
      {menu === "terms" && <SupportTerms />}
    </div>
  );
}
