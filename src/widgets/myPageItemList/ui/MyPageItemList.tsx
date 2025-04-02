import Link from "next/link";
import { MyPageGatheringList } from "./MyPageGatheringList";
import { MyPageInformationList } from "./MyPageInformationList";

const tabList = [
  {
    label: "정보",
    active: { name: "mainCategory", value: "정보" },
    content: <MyPageInformationList />,
    href: "/mypage?mainCategory=정보&category=owner",
  },
  {
    label: "모임",
    active: { name: "mainCategory", value: "모임" },
    content: <MyPageGatheringList />,
    href: "/mypage?mainCategory=모임&category=host",
  },
];

interface MyPageItemListProps {
  mainCategory: "정보" | "모임";
}

export const MyPageItemList = ({ mainCategory }: MyPageItemListProps) => {
  return (
    <div>
      <div className="flex w-full gap-6.5 border-b border-gray-200">
        {tabList.map((tab) => (
          <Link
            key={tab.label}
            className={[
              mainCategory === tab.label
                ? "text-main font-bold"
                : "text-gray1 font-medium",
              "relative h-8 w-16 text-center",
            ].join(" ")}
            href={tab.href}
            scroll={false}
          >
            {tab.label}
            <div
              className={[
                mainCategory === tab.label ? "bg-main h-0.5" : "opacity-0",
                "absolute -bottom-0.5 w-full",
              ].join(" ")}
            />
          </Link>
        ))}
      </div>
      <div className="transform whitespace-nowrap transition-all duration-300 ease-in-out">
        {tabList.find((tab) => tab.label === mainCategory)?.content}
      </div>
    </div>
  );
};
