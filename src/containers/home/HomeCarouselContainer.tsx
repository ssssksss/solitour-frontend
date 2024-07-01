"use client";

import HomeCarousel from "@/components/home/HomeCarousel";
import { useEffect, useState } from "react";

const HomeCarouselContainer = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const images = [
    "/background1.png",
    "/background2.svg",
    "/background3.svg",
    "/background4.svg",
  ];

  const onClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentIndex((currentIndex + 1) % 4),
      3000,
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
