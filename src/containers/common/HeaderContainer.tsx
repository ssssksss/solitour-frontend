"use client";

import Header from "@/components/common/Header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HeaderContainer = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState<boolean>(false);
  const [transparent, setTransparent] = useState<boolean>(true);

  const onScroll = () => {
    if (window.scrollY >= 500) {
      setTransparent(false);
    } else {
      setTransparent(true);
    }
  };

  const onMenuClicked = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Header
      pathname={pathname}
      visible={visible}
      transparent={transparent}
      onMenuClicked={onMenuClicked}
      onClose={onClose}
    />
  );
};

export default HeaderContainer;
