"use client";

import BestInformationList from "@/components/home/BestInformationList";
import useDragScroll from "@/hooks/useDragScroll";

const BestInformationListContainer = () => {
  const scrollHook = useDragScroll();

  return <BestInformationList scrollHook={scrollHook} />;
};

export default BestInformationListContainer;
