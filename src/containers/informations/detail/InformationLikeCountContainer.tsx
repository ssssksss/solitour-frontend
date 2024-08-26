import InformationLikeCount from "@/components/informations/detail/InformationLikeCount";
import { useState } from "react";

interface Props {
  informationId: number;
  likeCount: number;
}

const InformationLikeCountContainer = ({ informationId, likeCount }: Props) => {
  // TODO
  const [likes, setLikes] = useState<number>(likeCount);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onLikesClick = async () => {
    setLoading(true);

    const data = new URLSearchParams();
    data.append("infoId", informationId.toString());

    if (isLiked) {
      const response = await fetch("api/informations/great", {
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

      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      const response = await fetch("api/informations/great", {
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

      setLikes(likes + 1);
      setIsLiked(true);
    }

    setLoading(false);
  };

  return (
    <InformationLikeCount
      loading={loading}
      likeCount={likes}
      onLikesClick={onLikesClick}
    />
  );
};

export default InformationLikeCountContainer;
