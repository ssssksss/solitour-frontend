"use client";

import HomeHeader from "@/components/home/HomeHeader";
import { usePathname } from "next/navigation";
import { useState } from "react";

const HomeHeaderContainer = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState<boolean>(false);

  const onMenuClicked = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <HomeHeader
      pathname={pathname}
      visible={visible}
      onMenuClicked={onMenuClicked}
      onClose={onClose}
    />
  );
};

export default HomeHeaderContainer;
