"use client";

import Carousel from "@/components/common/Carousel";

type MyProps = {
  category: string;
};

const CarouselContainer = ({ category }: MyProps) => {
  const onClick = () => {
    // TODO
    alert("버튼 클릭");
  };

  return (
    <Carousel
      title="정보"
      content={[`유용한 <b>${category} 정보</b>를`, "<b>공유</b>해보세요!"]}
      buttonText={`${category} 등록하기`}
      category={category}
      onClick={onClick}
    />
  );
};

export default CarouselContainer;
