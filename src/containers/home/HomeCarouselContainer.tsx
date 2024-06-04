"use client";

import HomeCarousel from "@/components/home/HomeCarousel";
import { useEffect, useState } from "react";

const HomeCarouselContainer = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const images = ["/background.svg", "/1.jpg", "/2.jpg", "/3.jpg"];

  const onClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentIndex((currentIndex + 1) % 4),
      5000,
    );

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex]);

  return (
    <HomeCarousel
      images={images}
      currentIndex={currentIndex}
      onClick={onClick}
    />
  );
};

export default HomeCarouselContainer;
