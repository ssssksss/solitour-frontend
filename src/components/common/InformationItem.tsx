import { CATEGORY_TEXT } from "@/constants/informations/category";
import Image from "next/image";
import Link from "next/link";
import { CiBookmark } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";

interface Props {
  categoryId: number;
  informationId: number;
  title: string;
  image: string;
  address: string;
  likeCount: number;
  viewCount: number;
}

const InformationItem = ({
  categoryId,
  informationId,
  title,
  image,
  address,
  likeCount,
  viewCount,
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
    <div className="relative flex h-[19.6875rem] w-full flex-col justify-between rounded-2xl outline outline-1 outline-gray3 duration-300 hover:outline-main dark:outline-slate-400">
      <Image
        className="-z-10 rounded-[0.875rem] dark:opacity-65"
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
        <div className="relative h-7 w-5 cursor-pointer text-white hover:scale-110 dark:text-slate-200">
          <Image
            src="/bookmark-icon.svg"
            alt="bookmark-icon"
            fill={true}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>
      <div className="flex h-28 flex-col justify-between rounded-b-xl bg-white px-5 py-4 dark:bg-slate-800">
        <Link
          className="p-1 font-bold hover:text-main dark:text-slate-200"
          href={`/informations/${informationId}`}
        >
          {title}
        </Link>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-1 text-gray1 dark:text-slate-400">
            <TiLocation />
            <p className="text-xs font-medium">{address}</p>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-1 text-gray2 dark:text-slate-400">
              <FaRegHeart size={"0.8rem"} />
              <p className="text-xs">{likeCount}</p>
            </div>
            <div className="flex flex-row items-center gap-1 text-gray2 dark:text-slate-400">
              <Image
                src="/eyes-icon.svg"
                alt="eyes-icon.svg"
                width={15}
                height={15}
              />
              <p className="text-xs">{viewCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationItem;
