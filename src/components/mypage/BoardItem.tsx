import { CATEGORY_TEXT } from "@/constants/informations/category";
import Image from "next/image";
import Link from "next/link";
import { CiBookmark } from "react-icons/ci";
import { FaEye, FaRegHeart } from "react-icons/fa";
import ItemTag from "../informations/ItemTag";

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
          className="w-full max-w-[20rem] lg:max-w-[18.75rem] outline outline-[#d9d9d9] outline-offset-[1px] outline-[1px] rounded-2xl"
        href={`/informations/${CATEGORY_TEXT.get(category)}/${id}`}
      >
    <div className="relative flex aspect-square w-full flex-col justify-between rounded-2xl p-[1.5rem] duration-300 hover:scale-105">
      <Image
        className="-z-10 rounded-2xl"
        src={image}
        alt={"BoardImage"}
        fill={true}
        style={{
          objectFit: "cover",
        }}
      />
      <div className="flex flex-row items-center justify-between">
        <p
          className={`w-fit rounded-full border-2 px-4 py-1 text-sm font-semibold shadow ${style}`}
        >
          {category}
        </p>
        <div className="text-white">
          <CiBookmark size={"2rem"} />
        </div>
      </div>
      <div className="font-semibold text-white">
          {title}
        <div className="flex flex-row justify-between pt-2">
          <div className="flex flex-row items-center space-x-1">
            {tags.map((tag, index) => (
              <ItemTag key={index} tag={tag} />
            ))}
          </div>
          <div className="flex flex-row items-center space-x-2">
            <div className="flex flex-row items-center space-x-[2px] text-white">
              <FaEye />
              <p className="text-xs">222K</p>
            </div>
            <div className="flex flex-row items-center space-x-[2px] text-white">
              <FaRegHeart size={"0.75rem"} />
              <p className="text-xs">666M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default BoardItem;
