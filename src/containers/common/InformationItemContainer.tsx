"use client";

import InformationItem from "@/components/common/InformationItem";
import useAuthStore from "@/store/authStore";
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
  const userId = useAuthStore().id;
  const [isBookMarked, setIsBookMarked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onBookMarkClick = async () => {
    setLoading(true);

    if (isBookMarked) {
      const data = new URLSearchParams();
      data.append("infoId", informationId.toString());

      const response = await fetch("api/bookmark/information", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        alert("북마크 취소에 실패하였습니다.");
        setLoading(false);
        throw new Error(response.statusText);
      }

      setIsBookMarked(false);
    } else {
      const data = new URLSearchParams();
      data.append("infoId", informationId.toString());

      const response = await fetch("/api/bookmark/information", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        alert("북마크 등록에 실패하였습니다.");
        setLoading(false);
        throw new Error(response.statusText);
      }

      setIsBookMarked(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setIsBookMarked(isBookMark);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InformationItem
      informationId={informationId}
      categoryId={categoryId}
      userId={userId}
      isBookMark={isBookMarked}
      title={title}
      image={image}
      address={address}
      likeCount={likeCount}
      viewCount={viewCount}
      loading={loading}
      onBookMarkClick={onBookMarkClick}
    />
  );
};

export default InformationItemContainer;
