"use client";

import Banner from "@/components/common/Banner";

type MyProps = {
  category?: string;
};

const BannerContainer = ({ category = "정보" }: MyProps) => {
  return (
    <Banner
      content={[`유용한 <b>여행 정보</b>를`, "<b>공유</b>해보세요!"]}
      buttonText={`정보 등록하기`}
      category={`${category === "정보" ? category : "모임"}`}
    />
  );
};

export default BannerContainer;
