"use client";

import Header from "@/components/common/Header";
import { usePathname } from "next/navigation";

const HeaderContainer = () => {
  const pathname = usePathname();

  return <Header pathname={pathname} />;
};

export default HeaderContainer;
