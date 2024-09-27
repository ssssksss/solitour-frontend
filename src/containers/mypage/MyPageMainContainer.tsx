"use client";

import { useSearchParams } from "next/navigation";
import TabMenuContainer from "../common/TabMenuContainer";
import MyPageGatheringContainer from "./MyPageGatheringContainer";
import MyPageInformationContainer from "./MyPageInformationContainer";

const MyPageMainContainer = () => {
  const searchParams = useSearchParams();

  return (
    <TabMenuContainer
      tabs={[
        {
          label: "정보",
          active: { name: "mainCategory", value: "정보" },
          content: <MyPageInformationContainer />,
          href: "/mypage?mainCategory=정보&category=owner",
        },
        {
          label: "모임",
          active: { name: "mainCategory", value: "모임" },
          content: <MyPageGatheringContainer />,
          href: "/mypage?mainCategory=모임&category=host",
        },
      ]}
      defaultActive={searchParams.get("mainCategory") == "정보" ? 0 : 1}
    />
  );
};
export default MyPageMainContainer;
