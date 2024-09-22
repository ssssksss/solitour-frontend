"use client";

import InformationItem from "@/components/common/InformationItem";
import useAuthStore from "@/store/authStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useState } from "react";

interface Props {
  informationId: number;
  categoryName: string;
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
  categoryName,
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
    if (loading) {
      return;
    }

    setLoading(true);
    const data = new URLSearchParams();
    data.append("infoId", informationId.toString());

    if (isBookMarked) {
      setIsBookMarked(false);

      const response = await fetchWithAuth("/api/bookmark/information", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        setIsBookMarked(true);
        setLoading(false);
        alert("북마크 취소에 실패하였습니다.");
        throw new Error(response.statusText);
      }
    } else {
      setIsBookMarked(true);

      const response = await fetchWithAuth("/api/bookmark/information", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        setIsBookMarked(false);
        setLoading(false);
        alert("북마크 등록에 실패하였습니다.");
        throw new Error(response.statusText);
      }
    }

    setLoading(false);
  };

  return (
    <InformationItem
      informationId={informationId}
      categoryName={categoryName}
      userId={userId}
      isBookMark={isBookMarked}
      isLike={isLike}
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
