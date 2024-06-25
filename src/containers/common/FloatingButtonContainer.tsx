"use client";

import FloatingButton from "@/components/common/FloatingButton";
import { useState } from "react";

const FloatingButtonContainer = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const onClick = () => {
    setVisible(!visible);
  };

  const onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FloatingButton
      visible={visible}
      onClick={onClick}
      onScrollToTop={onScrollToTop}
    />
  );
};

export default FloatingButtonContainer;
