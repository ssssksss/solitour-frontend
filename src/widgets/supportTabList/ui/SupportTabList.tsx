import Link from "next/link";
import { SUPPORT_TABS } from "../config/supportTabs";

interface SupportTabListProps {
  menu: "about" | "notice" | "faq" | "terms";
}

export const SupportTabList = ({ menu }: SupportTabListProps) => {
  return (
    <div className="mb-4 flex w-full flex-col items-start py-1">
      <div className="flex w-full flex-col items-start gap-y-4 pt-9.5">
        <h1 className="w-full text-start text-3xl font-bold text-black">
          고객지원
        </h1>
        <p className="text-gray1">솔리투어 고객지원에서 도와드릴게요</p>
      </div>
      <article className="flex max-w-full flex-wrap justify-start gap-x-1 gap-y-2 pt-12">
        {SUPPORT_TABS.map((tab) => (
          <Link
            key={tab.value}
            className={[
              tab.value === menu
                ? "bg-main text-white outline-0"
                : "hover:text-main text-gray-700 outline hover:bg-gray-200",
              "flex max-w-fit flex-shrink-0 transform items-center justify-center rounded-full px-6 py-3 text-lg font-medium outline -outline-offset-1 outline-[#e3e3e3b8] transition-transform duration-300 ease-in-out",
            ].join(" ")}
            href={`/support?menu=${tab.value}`}
          >
            {tab.name}
          </Link>
        ))}
      </article>
    </div>
  );
};
