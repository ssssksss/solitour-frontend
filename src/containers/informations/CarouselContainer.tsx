"use client";

import Carousel from "@/components/informations/Carousel";
import { usePathname } from "next/navigation";

const CarouselContainer = () => {
  const pathname = usePathname();

  const onClick = () => {
    // TODO
    alert("버튼 클릭");
  };

  return <Carousel pathname={pathname} onClick={onClick} />;
};

export default CarouselContainer;
