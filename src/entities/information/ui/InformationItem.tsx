"use client";

import Image from "next/image";
import Link from "next/link";
import { TiLocation } from "react-icons/ti";
import { convertNumberToShortForm } from "@/shared/lib/utils/convertNumberToShortForm";
import { useInformationItem } from "@/hooks/common/useInformationItem";
import { HeartIcon } from "@/shared/ui/icon";

interface InformationItemProps {
  informationId: number;
  categoryName?: string;
  initialIsBookMarked: boolean;
  isLike: boolean;
  title: string;
  image: string;
  address: string;
  likeCount: number;
  viewCount: number;
}

export const InformationItem = ({
  informationId,
  categoryName,
  initialIsBookMarked,
  isLike,
  title,
  image,
  address,
  likeCount,
  viewCount,
}: InformationItemProps) => {
  const { userId, isBookMarked, categoryTagStyle, handleBookMarkClick } =
    useInformationItem(informationId, initialIsBookMarked, categoryName);

  return (
    <div className="outline-gray3 hover:outline-main relative flex h-[19.6875rem] w-full flex-col justify-between rounded-2xl outline outline-1 duration-300 max-[744px]:min-w-[19.183125rem]">
      <Link className="h-[12.6875rem]" href={`/informations/${informationId}`}>
        <Image
          className="-z-10 rounded-[0.875rem]"
          src={image}
          alt="information-image"
          fill={true}
          style={{ objectFit: "cover" }}
        />
        <div className="rounded-0 flex flex-row items-center justify-between px-5 pt-5">
          {categoryTagStyle !== "" ? (
            <p
              className={[
                categoryTagStyle,
                "w-fit rounded-full border-[0.0625rem] px-4 py-[0.375rem] text-xs font-semibold",
              ].join(" ")}
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
                handleBookMarkClick();
              }}
            >
              <Image
                src={`/icons/bookmark-${isBookMarked ? "active-" : ""}icon.svg`}
                alt="bookmark-icon"
                fill={true}
                style={{ objectFit: "contain" }}
              />
            </button>
          )}
        </div>
      </Link>
      <div className="flex h-28 flex-col justify-between rounded-b-xl bg-white px-5 py-4">
        <Link
          className="truncate-vertical-information-title hover:text-main p-1 font-bold"
          href={`/informations/${informationId}`}
        >
          {title}
        </Link>
        <div className="flex flex-row justify-between">
          <div className="text-gray1 flex flex-row items-center gap-1">
            <TiLocation />
            <p className="text-xs font-medium">
              {address.slice(0, 2) === "세종" ? "세종특별자치시" : address}
            </p>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div
              className={[
                isLike
                  ? "fill-[#F85E5E] stroke-[#F85E5E] text-[#F85E5E]"
                  : "stroke-gray2 text-gray2 fill-none",
                "flex flex-row items-center gap-[0.3125rem] text-xs",
              ].join(" ")}
            >
              <HeartIcon className="fill-inherit stroke-inherit" />
              <p>{convertNumberToShortForm(likeCount)}</p>
            </div>
            <div className="text-gray2 flex flex-row items-center gap-1">
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
