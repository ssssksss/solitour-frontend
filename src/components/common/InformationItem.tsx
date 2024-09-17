import { CATEGORY_TEXT } from "@/constants/informations/category";
import Image from "next/image";
import Link from "next/link";
import { TiLocation } from "react-icons/ti";
import HashSpinner from "./HashSpinner";
import { convertNumberToShortForm } from "@/utils/convertNumberToShortForm";

interface Props {
  informationId: number;
  categoryId: number;
  userId?: number;
  isBookMark: boolean;
  isLike: boolean;
  title: string;
  image: string;
  address: string;
  likeCount: number;
  viewCount: number;
  loading?: boolean;
  onBookMarkClick: () => void;
}

const InformationItem = ({
  informationId,
  categoryId,
  userId = 0,
  isBookMark,
  isLike,
  title,
  image,
  address,
  likeCount,
  viewCount,
  loading = false,
  onBookMarkClick,
}: Props) => {
  let style = "";
  switch (categoryId) {
    case 1:
      style = "border-[#FFDDEF] bg-[#FFF2F9] text-[#C5006A]";
      break;
    case 2:
      style = "border-[#BEEDEA] bg-[#E7FFFB] text-[#009CBE]";
      break;
    case 3:
      style = "border-[#DDE5FF] bg-[#F2F6FF] text-[#0036C2]";
      break;
    default:
      break;
  }

  return (
    <div className="relative flex h-[19.6875rem] w-full flex-col justify-between rounded-2xl outline outline-1 outline-gray3 duration-300 hover:outline-main">
      <HashSpinner loading={loading} />
      <Link href={`/informations/${informationId}`} className="h-[12.6875rem]">
        <Image
          className="-z-10 rounded-[0.875rem]"
          src={image || "/next.svg"}
          alt={"PostImage"}
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
              {CATEGORY_TEXT[categoryId]}
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
                src={`/bookmark-icon${isBookMark ? "-marked" : ""}.svg`}
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
            <p className="text-xs font-medium">{address}</p>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div
              className={`${isLike ? "text-[#F85E5E]" : "text-gray2"} flex flex-row items-center gap-[0.3125rem] text-xs`}
            >
              <div className="relative h-4 w-4 text-white">
                {isLike ? (
                  <Image
                    src="/common/heart-active-icon.svg"
                    alt="like-icon"
                    fill={true}
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <Image
                    src="/common/heart-empty-icon.svg"
                    alt="like-icon"
                    fill={true}
                    style={{ objectFit: "contain" }}
                  />
                )}
              </div>
              <p>{convertNumberToShortForm(likeCount)}</p>
            </div>
            <div className="flex flex-row items-center gap-1 text-gray2">
              <Image
                src="/eyes-icon.svg"
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
