import { CiBookmark } from "react-icons/ci";
import { FaEye, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { CATEGORY_TEXT } from "@/constants/informations/category";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";

type MyProps = {
  id: number;
  category: string;
  title: string;
  image: string;
};

// todo
const InformationItem = ({ id, category, title, image }: MyProps) => {
  let style = "";
  switch (category) {
    case "맛집":
      style = "border-[#FFDDEF] bg-[#FFF2F9] text-[#C5006A]";
      break;
    case "숙박":
      style = "border-[#BEEDEA] bg-[#E7FFFB] text-[#009CBE]";
      break;
    case "액티비티":
      style = "border-[#DDE5FF] bg-[#F2F6FF] text-[#0036C2]";
      break;
    default:
      break;
  }

  return (
    <div className="relative mt-6 flex h-[19rem] w-[19rem] flex-col justify-between rounded-2xl outline outline-2 outline-gray3 duration-300 hover:outline-main">
      <Image
        className="-z-10 rounded-[0.875rem]"
        src={image}
        alt={"PostImage"}
        fill={true}
        style={{
          objectFit: "cover",
        }}
      />
      <div className="rounded-0 flex flex-row items-center justify-between px-5 pt-5">
        <p
          className={`w-fit rounded-full border-2 px-4 py-1 text-sm font-semibold shadow ${style}`}
        >
          {category}
        </p>
        <div className="cursor-pointer text-white hover:scale-110">
          <CiBookmark size={"2rem"} />
        </div>
      </div>
      <div className="flex h-28 flex-col justify-between bg-white px-5 py-4">
        <Link
          className="p-1 font-bold hover:text-green-200"
          href={`/informations/${CATEGORY_TEXT[category]}/${id}`}
        >
          {title}
        </Link>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center text-gray1">
            <MdLocationOn />
            <p className="text-xs">제주특별자치도, 제주시</p>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-[0.125rem] text-gray2">
              <FaRegHeart size={"0.75rem"} />
              <p className="text-xs">666M</p>
            </div>
            <div className="flex flex-row items-center gap-[0.125rem] text-gray2">
              <FaEye />
              <p className="text-xs">222K</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationItem;
