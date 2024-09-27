"use client";

import TabMenu from "@/components/mypage/TabMenu";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface TabMenuProps {
  tabs: {
    label: string;
    content: React.ReactNode;
    href?: string;
    active: { name: string; value: string };
  }[];
  defaultActive: number;
}

const TabMenuContainer: React.FC<TabMenuProps> = ({ tabs, defaultActive }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActive || 0);
  const searchparams = useSearchParams();

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    if (tabs[index]?.href) {
      window.history.pushState({}, "", tabs[index]?.href);
    }
  };

  // 뒤로가기나 앞으로 가기시 활성화를 시키기 위해 있는 로직
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    tabs.map((i, index) => {
      if (i.active.value == params.get(i.active.name)) {
        setActiveIndex(index);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchparams]);

  return (
    <TabMenu
      tabs={tabs}
      activeIndex={activeIndex}
      handleTabClick={handleTabClick}
    />
  );
};

export default TabMenuContainer;
