"use client";

import HomeCarousel from "@/components/home/HomeCarousel";
import { Banner } from "@/types/BannerDto";
import { useEffect, useState } from "react";
interface IHomeCarouselContainer {
  initBannerList: Banner[] | [];
}
const HomeCarouselContainer = (props: IHomeCarouselContainer) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [bannerList, _] = useState([
    { id: 0, name: "", url: "/background1.png" },
    { id: 0, name: "", url: "/background2.svg" },
    { id: 0, name: "", url: "/background3.svg" },
    { id: 0, name: "", url: "/background4.svg" },
    ...props.initBannerList,
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
