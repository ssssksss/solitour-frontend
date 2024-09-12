import HashSpinner from "@/components/common/HashSpinner";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
  clickable: boolean;
  loading: boolean;
  likeCount: number;
  isLiked: boolean;
  onLikesClick: () => void;
}

const InformationLikeCount = ({
  clickable,
  loading,
  likeCount,
  isLiked,
  onLikesClick,
}: Props) => {
  if (!clickable) {
    return (
      <div className="flex flex-row items-center gap-1 text-xs text-gray2">
        <FaRegHeart />
        <p>{likeCount}</p>
      </div>
    );
  }

  return (
    <div>
      <HashSpinner loading={loading} />
      <button
        className={`${isLiked ? "text-[#F85E5E]" : "text-gray2"} flex flex-row items-center gap-[0.3125rem] text-xs hover:text-[#F85E5E]`}
        type="button"
        onClick={() => onLikesClick()}
      >
        {isLiked ? <FaHeart /> : <FaRegHeart />}
        <p>{likeCount}</p>
      </button>
    </div>
  );
};

export default InformationLikeCount;
