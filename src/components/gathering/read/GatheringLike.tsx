import { convertNumberToShortForm } from "@/utils/convertNumberToShortForm";
import Image from "next/image";

interface IGatheringLike {
  likes: number;
  isLike: boolean;
  gatheringId: number;
  loading: boolean;
  userId: number;
  handleClick: (e: React.MouseEvent) => void;
}
const GatheringLike = ({
  likes,
  isLike,
  loading,
  userId,
  handleClick,
}: IGatheringLike) => {
  return (
    <button
      onClick={(e) => handleClick(e)}
      disabled={loading || userId < 1}
      className={`${userId < 1 ? "cursor-default" : "cursor-pointer"} hover:size-110 flex flex-row items-center gap-1 text-sm ${loading ? "text-gray-400" : "text-gray-600"} `}
    >
      <div className="relative h-4 w-4 text-white">
        {isLike ? (
          <Image
            src="/icons/heart-active-icon.svg"
            alt="heart-active-icon"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <Image
            src="/icons/heart-empty-icon.svg"
            alt="heart-empty-icon"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        )}
      </div>
      {convertNumberToShortForm(likes)}
    </button>
  );
};
export default GatheringLike;
