"use client";

import HomeCarousel from "@/components/home/HomeCarousel";
import { useEffect, useState } from "react";

const HomeCarouselContainer = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [bannerList, _] = useState([
    { id: 0, name: "", url: "/images/carousel-image1.avif" },
    { id: 0, name: "", url: "/images/carousel-image2.avif" },
    { id: 0, name: "", url: "/images/carousel-image3.avif" },
    { id: 0, name: "", url: "/images/carousel-image4.avif" },
  ]);

  const onClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentIndex((currentIndex + 1) % (bannerList.length || 1)),
      3000,
    );

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <HomeCarousel
      images={bannerList}
      currentIndex={currentIndex}
      onClick={onClick}
    />
  );
};

export default HomeCarouselContainer;
