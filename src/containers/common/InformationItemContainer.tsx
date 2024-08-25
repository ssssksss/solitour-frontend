"use client";

import InformationItem from "@/components/common/InformationItem";
import { useEffect, useState } from "react";

interface Props {
  informationId: number;
  categoryId: number;
  isBookMark: boolean;
  title: string;
  image: string;
  address: string;
  likeCount: number;
  viewCount: number;
}

const InformationItemContainer = ({
  informationId,
  categoryId,
  isBookMark,
  title,
  image,
  address,
  likeCount,
  viewCount,
}: Props) => {
  const [isBookMarked, setIsBookMarked] = useState<boolean>(false);

  const onBookMarkClick = () => {
    setIsBookMarked(!isBookMarked);
  };

  useEffect(() => {
    setIsBookMarked(isBookMark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InformationItem
      informationId={informationId}
      categoryId={categoryId}
      isBookMark={isBookMarked}
      title={title}
      image={image}
      address={address}
      likeCount={likeCount}
      viewCount={viewCount}
      onBookMarkClick={onBookMarkClick}
    />
  );
};

export default InformationItemContainer;
