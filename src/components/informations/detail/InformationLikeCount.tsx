import HashSpinner from "@/components/common/HashSpinner";
import HeartIcon from "@/components/common/icons/HeartIcon";
import { convertNumberToShortForm } from "@/utils/convertNumberToShortForm";
import Image from "next/image";
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
        <p>{convertNumberToShortForm(likeCount)}</p>
      </div>
    );
  }

  return (
    <div>
      <HashSpinner loading={loading} />
      <button
        className={`${isLiked ? "fill-[#F85E5E] stroke-[#F85E5E] text-[#F85E5E]" : "fill-none stroke-gray2 text-gray2 hover:fill-[#F85E5E] hover:stroke-[#F85E5E]"} flex flex-row items-center gap-[0.3125rem] text-xs hover:text-[#F85E5E]`}
        type="button"
        onClick={() => onLikesClick()}
      >
        <HeartIcon className="fill-inherit stroke-inherit" />
        <p>{convertNumberToShortForm(likeCount)}</p>
      </button>
    </div>
  );
};

export default InformationLikeCount;
