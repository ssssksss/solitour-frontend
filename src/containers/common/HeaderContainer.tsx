"use client";

import Header from "@/components/common/Header";
import { usePathname } from "next/navigation";
import { useState } from "react";

const HeaderContainer = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState<boolean>(false);

  const onMenuClicked = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Header
      pathname={pathname}
      visible={visible}
      onMenuClicked={onMenuClicked}
      onClose={onClose}
    />
  );
};

export default HeaderContainer;
