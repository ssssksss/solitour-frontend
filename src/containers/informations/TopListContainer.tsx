"use client";

import TopList from "@/components/common/TopList";

type MyProps = {
  category: "여행" | "모임";
};

const TopListContainer = ({ category }: MyProps) => {
  return <TopList title={`${category}`} />;
};

export default TopListContainer;
