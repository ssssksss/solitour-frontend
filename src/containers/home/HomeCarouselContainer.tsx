"use client";

import HomeCarousel from "@/components/home/HomeCarousel";
import { useEffect, useRef, useState } from "react";

const HomeCarouselContainer = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const bannerList = useRef([
    "/images/carousel-image1.avif",
    "/images/carousel-image2.avif",
    "/images/carousel-image3.avif",
    "/images/carousel-image4.avif",
  ]);

  const onClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(
      () =>
        setCurrentIndex((currentIndex + 1) % (bannerList.current.length || 1)),
      3000,
    );

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <HomeCarousel
      images={bannerList.current}
      currentIndex={currentIndex}
      onClick={onClick}
    />
  );
};

export default HomeCarouselContainer;
