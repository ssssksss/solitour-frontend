import HeartIcon from "@/components/common/icons/HeartIcon";
import { convertNumberToShortForm } from "@/utils/convertNumberToShortForm";

interface Props {
  clickable: boolean;
  likeCount: number;
  isLiked: boolean;
  onLikesClick: () => void;
}

const InformationLikeCount = ({
  clickable,
  likeCount,
  isLiked,
  onLikesClick,
}: Props) => {
  if (!clickable) {
    return (
      <div className="flex flex-row items-center gap-1 stroke-gray2 text-xs text-gray2">
        <HeartIcon className="stroke-inherit" />
        <p>{convertNumberToShortForm(likeCount)}</p>
      </div>
    );
  }

  return (
    <button
      className={`${isLiked ? "fill-[#F85E5E] stroke-[#F85E5E] text-[#F85E5E]" : "fill-none stroke-gray2 text-gray2 hover:fill-[#F85E5E] hover:stroke-[#F85E5E]"} flex flex-row items-center gap-[0.3125rem] text-xs hover:text-[#F85E5E]`}
      type="button"
      onClick={() => onLikesClick()}
    >
      <HeartIcon className="fill-inherit stroke-inherit" />
      <p>{convertNumberToShortForm(likeCount)}</p>
    </button>
  );
};

export default InformationLikeCount;
