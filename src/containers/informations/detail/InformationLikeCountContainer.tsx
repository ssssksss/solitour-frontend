"use client";

import InformationLikeCount from "@/components/informations/detail/InformationLikeCount";
import useAuthStore from "@/store/authStore";
import useInformationLikeStore from "@/store/informationLikeStore";
import { useEffect, useState } from "react";

interface Props {
  informationId: number;
  likeCount: number;
  isLike: boolean;
}

const InformationLikeCountContainer = ({
  informationId,
  likeCount,
  isLike,
}: Props) => {
  const userId = useAuthStore().id;
  const informationLikeStore = useInformationLikeStore();
  const [loading, setLoading] = useState<boolean>(false);

  const onLikesClick = async () => {
    setLoading(true);

    const data = new URLSearchParams();
    data.append("infoId", informationId.toString());

    if (informationLikeStore.isLiked) {
      const response = await fetch("/api/informations/great", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        alert("좋아요 취소에 실패하였습니다.");
        setLoading(false);
        throw new Error(response.statusText);
      }

      informationLikeStore.setInformationLike({
        likeCount: informationLikeStore.likeCount - 1,
        isLiked: false,
      });
    } else {
      const response = await fetch("/api/informations/great", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        alert("좋아요 등록에 실패하였습니다.");
        setLoading(false);
        throw new Error(response.statusText);
      }

      informationLikeStore.setInformationLike({
        likeCount: informationLikeStore.likeCount + 1,
        isLiked: true,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    informationLikeStore.setInformationLike({
      likeCount: likeCount,
      isLiked: isLike,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InformationLikeCount
      clickable={userId > 0}
      loading={loading}
      likeCount={informationLikeStore.likeCount}
      isLiked={informationLikeStore.isLiked}
      onLikesClick={onLikesClick}
    />
  );
};

export default InformationLikeCountContainer;
