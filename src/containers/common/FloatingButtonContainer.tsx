"use client";

import FloatingButton from "@/components/common/FloatingButton";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useRef, useState } from "react";

const FloatingButtonContainer = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [animationFlag, setAnimationFlag] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onClick = async () => {
    if (visible) {
      setAnimationFlag(true);
      await new Promise((resolve) => setTimeout(resolve, 250));
      setAnimationFlag(false);
    }

    setVisible(!visible);
  };

  const onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useOutsideClick(ref, () => {
    onClick();
  });

  return (
    <FloatingButton
      visible={visible}
      animationFlag={animationFlag}
      onClick={onClick}
      onScrollToTop={onScrollToTop}
      ref={ref}
    />
  );
};

export default FloatingButtonContainer;
