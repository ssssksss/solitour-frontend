import Image from "next/image";
import Link from "next/link";
import { TiLocation } from "react-icons/ti";
import { convertNumberToShortForm } from "@/utils/convertNumberToShortForm";
import InformationLikeCountContainer from "@/containers/common/InformationLikeCountContainer";

interface Props {
  informationId: number;
  categoryName: string;
  userId?: number;
  isBookMark: boolean;
  isLike: boolean;
  title: string;
  image: string;
  address: string;
  likeCount: number;
  viewCount: number;
  onBookMarkClick: () => void;
}

const InformationItem = ({
  informationId,
  categoryName,
  userId = 0,
  isBookMark,
  isLike,
  title,
  image,
  address,
  likeCount,
  viewCount,
  onBookMarkClick,
}: Props) => {
  let style = "";
  switch (categoryName) {
    case "맛집":
    case "혼카페":
    case "혼밥":
    case "혼술":
      style = "border-[#FFDDEF] bg-[#FFF2F9] text-[#C5006A]";
      break;
    case "숙박":
    case "호텔/펜션":
    case "게스트하우스":
    case "모텔":
    case "홈/빌라":
    case "한옥":
      style = "border-[#BEEDEA] bg-[#E7FFFB] text-[#009CBE]";
      break;
    case "액티비티":
    case "레저":
    case "관광지":
    case "전시":
    case "편집/소품샵":
      style = "border-[#DDE5FF] bg-[#F2F6FF] text-[#0036C2]";
      break;
    default:
      break;
  }

  return (
    <div className="relative flex h-[19.6875rem] w-full flex-col justify-between rounded-2xl outline outline-1 outline-gray3 duration-300 hover:outline-main max-[744px]:min-w-[19.183125rem]">
      <Link href={`/informations/${informationId}`} className="h-[12.6875rem]">
        <Image
          className="-z-10 rounded-[0.875rem]"
          src={image}
          alt="information-image"
          fill={true}
          style={{
            objectFit: "cover",
          }}
        />
        <div className="rounded-0 flex flex-row items-center justify-between px-5 pt-5">
          {style !== "" ? (
            <p
              className={`w-fit rounded-full border-[0.0625rem] px-4 py-[0.375rem] text-xs font-semibold ${style}`}
            >
              {categoryName}
            </p>
          ) : (
            <div />
          )}
          {userId > 0 && (
            <button
              className="relative h-7 w-5 cursor-pointer text-white hover:scale-110"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBookMarkClick();
              }}
            >
              <Image
                src={`/icons/bookmark-${isBookMark ? "active-" : ""}icon.svg`}
                alt="bookmark-icon"
                fill={true}
                style={{
                  objectFit: "contain",
                }}
              />
            </button>
          )}
        </div>
      </Link>
      <div className="flex h-28 flex-col justify-between rounded-b-xl bg-white px-5 py-4">
        <Link
          className="truncate-vertical-information-title p-1 font-bold hover:text-main"
          href={`/informations/${informationId}`}
        >
          {title}
        </Link>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-1 text-gray1">
            <TiLocation />
            <p className="text-xs font-medium">
              {address.slice(0, 2) === "세종" ? "세종특별자치시" : address}
            </p>
          </div>
          <div className="flex flex-row items-center gap-3">
            <InformationLikeCountContainer
              informationId={informationId}
              likeCount={likeCount}
              isLike={isLike}
            />
            <div className="flex flex-row items-center gap-1 text-gray2">
              <Image
                src="/icons/eyes-icon.svg"
                alt="eyes-icon.svg"
                width={15}
                height={15}
              />
              <p className="text-xs">{convertNumberToShortForm(viewCount)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationItem;
