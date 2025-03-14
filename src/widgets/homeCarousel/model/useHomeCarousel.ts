"use client";

import { useEffect, useRef, useState } from "react";

export const useHomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageList = useRef([
    "/images/carousel-image1.avif",
    "/images/carousel-image2.avif",
    "/images/carousel-image3.avif",
    "/images/carousel-image4.avif",
  ]);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(
      () =>
        setCurrentIndex((currentIndex + 1) % (imageList.current.length || 1)),
      3000,
    );

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex]);

  return { currentIndex, imageList: imageList.current, handleClick };
};
