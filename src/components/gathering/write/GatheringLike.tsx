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
const GatheringLike = ({likes, isLike, loading, userId, handleClick}: IGatheringLike) => {
  return (
             <button
            onClick={userId > 0 ? handleClick : undefined}
            disabled={loading}
            className={`${userId < 1 && `cursor-default`} text-sm flex flex-row items-center gap-1 ${loading ? 'text-gray-400' : 'text-gray-600'} dark:${loading ? 'text-slate-400' : 'text-slate-200'}`}
        >
            <div className="relative h-4 w-4 text-white dark:text-slate-200">
                {isLike ? (
                    <Image
                        src="/common/heart-active-icon.svg"
                        alt="like-icon"
                        fill={true}
                        style={{ objectFit: 'contain' }}
                    />
                ) : (
                    <Image
                        src="/common/heart-empty-icon.svg"
                        alt="like-icon"
                        fill={true}
                        style={{ objectFit: 'contain' }}
                    />
                )}
            </div>
            {convertNumberToShortForm(likes)}
        </button>
  );
};
export default GatheringLike