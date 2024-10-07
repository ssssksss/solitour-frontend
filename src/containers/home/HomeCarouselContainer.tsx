"use client";

import HomeCarousel from "@/components/home/HomeCarousel";
import { useEffect, useState } from "react";

const HomeCarouselContainer = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [bannerList, _] = useState([
    { id: 0, name: "", url: "/home/background1.png" },
    { id: 0, name: "", url: "/home/background2.png" },
    { id: 0, name: "", url: "/home/background3.png" },
    { id: 0, name: "", url: "/home/background4.png" },
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
