"use client";

import Banner from "@/components/common/Banner";

type MyProps = {
  category?: string;
};

const BannerContainer = ({ category = "정보" }: MyProps) => {
  const onClick = () => {
    // TODO
    alert("버튼 클릭");
  };

  return (
    <Banner
      title="정보"
      content={[`유용한 <b>${category} 정보</b>를`, "<b>공유</b>해보세요!"]}
      buttonText={`${category} 등록하기`}
      category={category}
      onClick={onClick}
    />
  );
};

export default BannerContainer;
