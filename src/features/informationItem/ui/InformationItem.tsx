import Image from "next/image";
import Link from "next/link";
import { TiLocation } from "react-icons/ti";
import { convertNumberToShortForm } from "@/shared/lib/utils/convertNumberToShortForm";
import { HeartIcon } from "@/shared/ui/icon";
import { InformationBookmark } from "./InformationBookmark";
import { CATEGORY_TAG_STYLE } from "../config/categoryTagStyle";

interface InformationItemProps {
  informationId: number;
  categoryName?: string;
  initialIsBookmarked: boolean;
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
  initialIsBookmarked,
  isLike,
  title,
  image,
  address,
  likeCount,
  viewCount,
}: InformationItemProps) => {
  return (
    <div className="outline-gray3 hover:outline-main relative flex h-[19.6875rem] w-full flex-col justify-between rounded-2xl outline duration-300 max-[744px]:min-w-[19.183125rem]">
      <Link className="h-[12.6875rem]" href={`/informations/${informationId}`}>
        <Image
          className="-z-10 rounded-[0.875rem]"
          src={image}
          alt="information-image"
          fill={true}
          style={{ objectFit: "cover" }}
        />
        <div className="rounded-0 flex flex-row items-center justify-between px-5 pt-5">
          {categoryName !== undefined ? (
            <p
              className={[
                CATEGORY_TAG_STYLE[categoryName],
                "w-fit rounded-full border px-4 py-[0.375rem] text-xs font-semibold",
              ].join(" ")}
            >
              {categoryName}
            </p>
          ) : (
            <div />
          )}
          <InformationBookmark
            informationId={informationId}
            initialIsBookmarked={initialIsBookmarked}
          />
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
