import HashSpinner from "@/components/common/HashSpinner";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
  loading: boolean;
  likeCount: number;
  isLiked: boolean;
  onLikesClick: () => void;
}

// hover:text-[#F85E5E]

const InformationLikeCount = ({
  loading,
  likeCount,
  isLiked,
  onLikesClick,
}: Props) => {
  return (
    <div>
      <HashSpinner loading={loading} />
      <button
        className={`${isLiked ? "text-[#F85E5E]" : "text-gray2"} flex flex-row items-center gap-1 hover:text-[#F85E5E] dark:text-slate-400`}
        type="button"
        onClick={() => onLikesClick()}
      >
        {isLiked ? <FaHeart size={"0.8rem"} /> : <FaRegHeart size={"0.8rem"} />}
        <p className="text-xs">{likeCount}</p>
      </button>
    </div>
  );
};

export default InformationLikeCount;
