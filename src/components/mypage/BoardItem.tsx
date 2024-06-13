import { CATEGORY_TEXT } from "@/constants/informations/category";
import Image from "next/image";
import Link from "next/link";
import { CiBookmark } from "react-icons/ci";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

type MyProps = {
  id: number;
  category: string;
  title: string;
  image: string;
  tags: string[];
};

// todo
const BoardItem = ({ id, category, title, image, tags }: MyProps) => {
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
    <Link
      className="w-full max-w-[20rem] rounded-2xl lg:max-w-[18.75rem]"
      href={`/informations/${CATEGORY_TEXT[category]}/${id}`}
    >
      <div className="relative flex aspect-square w-full flex-col justify-end rounded-2xl duration-300 hover:scale-105 ">
        <Image
          className="-z-10 rounded-2xl"
          src={image}
          alt={"BoardImage"}
          fill={true}
          style={{
            objectFit: "cover",
          }}
        />
        <div className="flex flex-row items-center justify-between absolute px-[1.5rem] top-[1.5rem] w-full ">
          <p
            className={`w-fit rounded-full border-2 px-4 py-1 text-sm font-semibold shadow ${style}`}
          >
            {category}
          </p>
          <div className="text-white">
            <CiBookmark size={"2rem"} />
          </div>
        </div>
              <div className="flex h-28 flex-col justify-between bg-white px-5 py-4 outline outline-[1px] outline-offset-[-1px] outline-[#d9d9d9] rounded-b-[1rem]">
        <div
          className="p-1 font-bold hover:text-green-200"
        >
          {title}
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center text-gray1">
            <MdLocationOn />
            <p className="text-xs">제주특별자치도, 제주시</p>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <div className="flex flex-row items-center space-x-[0.125rem] text-gray2">
              <FaRegHeart size={"0.75rem"} />
              <p className="text-xs">666M</p>
            </div>
            <div className="flex flex-row items-center space-x-[0.125rem] text-gray2">
              <FaEye />
              <p className="text-xs">222K</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Link>
  );
};

export default BoardItem;
