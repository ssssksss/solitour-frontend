"use client";

import InformationItem from "@/components/common/InformationItem";
import useAuthStore from "@/store/authStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useState } from "react";

interface Props {
  informationId: number;
  categoryId: number;
  isBookMark: boolean;
  isLike: boolean;
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
  isLike,
  title,
  image,
  address,
  likeCount,
  viewCount,
}: Props) => {
  const userId = useAuthStore().id;
  const [isBookMarked, setIsBookMarked] = useState<boolean>(isBookMark);
  const [loading, setLoading] = useState<boolean>(false);

  const onBookMarkClick = async () => {
    setLoading(true);

    const data = new URLSearchParams();
    data.append("infoId", informationId.toString());

    if (isBookMarked) {
      const response = await fetchWithAuth("/api/bookmark/information", {
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
      const response = await fetchWithAuth("/api/bookmark/information", {
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

  return (
    <InformationItem
      informationId={informationId}
      categoryId={categoryId}
      userId={userId}
      isBookMark={isBookMarked}
      isLike={isLike}
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
