"use client";

import FloatingButton from "@/components/common/FloatingButton";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useRef, useState } from "react";

const FloatingButtonContainer = () => {
  const [visible, setVisible] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    setVisible(!visible);
  };

  const onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useOutsideClick(ref, () => {
    setVisible(false);
  });

  return (
    <FloatingButton
      visible={visible}
      onClick={onClick}
      onScrollToTop={onScrollToTop}
      ref={ref}
    />
  );
};

export default FloatingButtonContainer;
