import HashSpinner from "@/components/common/HashSpinner";
import { FaRegHeart } from "react-icons/fa";

interface Props {
  loading: boolean;
  likeCount: number;
  onLikesClick: () => void;
}

const InformationLikeCount = ({ loading, likeCount, onLikesClick }: Props) => {
  return (
    <div>
      <HashSpinner loading={loading} />
      <button
        className="flex flex-row items-center gap-1 text-gray2 hover:text-[#F85E5E] dark:text-slate-400"
        type="button"
        onClick={() => onLikesClick()}
      >
        <FaRegHeart size={"0.8rem"} />
        <p className="text-xs">{likeCount}</p>
      </button>
    </div>
  );
};

export default InformationLikeCount;
