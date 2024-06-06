"use client";

import TopList from "@/components/common/TopList";

type MyProps = {
  category: string;
};

const TopListContainer = ({ category }: MyProps) => {
  return <TopList title={`${category}`} />;
};

export default TopListContainer;
