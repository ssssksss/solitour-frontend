import { SupportTabList } from "@/widgets/supportTabList";
import { SupportAbout } from "@/widgets/supportAbout";
import { SupportTerms } from "@/widgets/supportTerms";
import { SupportFAQList } from "@/widgets/supportFAQList";
import { SupportNoticeList } from "@/widgets/supportNoticeList";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const menu = (await searchParams).menu;

  if (
    menu !== "about" &&
    menu !== "notice" &&
    menu !== "faq" &&
    menu !== "terms"
  ) {
    throw new Error("Not Found");
  }

  return (
    <div className="mb-8 w-full">
      <SupportTabList menu={menu} />
      {menu === "about" && <SupportAbout />}
      {menu === "notice" && <SupportNoticeList />}
      {menu === "faq" && <SupportFAQList />}
      {menu === "terms" && <SupportTerms />}
    </div>
  );
}
