"use client";

import TopList from "@/components/informations/TopList";

const TopListContainer = () => {
  const onClick = () => {
    // TODO
    alert("top 클릭");
  };

  return <TopList onClick={onClick} />;
};

export default TopListContainer;
