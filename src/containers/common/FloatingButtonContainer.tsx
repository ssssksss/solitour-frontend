"use client";

import FloatingButton from "@/components/common/FloatingButton";

const FloatingButtonContainer = () => {
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return <FloatingButton onClick={onClick} />;
};

export default FloatingButtonContainer;
