"use client";

import { useState } from "react";

export const useCardFlipAnimation = () => {
  const [flag, setFlag] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = async () => {
    setFlag(!flag);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setIsFlipped(!isFlipped);
  };

  return { flag, isFlipped, handleFlip };
};
