"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useMyPageItemList = (
  tabList: {
    label: string;
    content: React.ReactNode;
    href: string;
    active: { name: string; value: string };
  }[],
  defaultActive: number,
) => {
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  const searchParams = useSearchParams();

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    window.history.pushState(null, "", tabList[index].href);
  };

  // 뒤로가기나 앞으로 가기시 활성화를 시키기 위해 있는 로직
  useEffect(() => {
    tabList.forEach((tab, index) => {
      if (tab.active.value === searchParams.get(tab.active.name)) {
        setActiveIndex(index);
      }
    });
  }, [searchParams, tabList]);

  return { activeIndex, handleTabClick };
};
