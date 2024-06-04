import { CiBookmark } from "react-icons/ci";
import ItemTag from "../informations/ItemTag";
import { FaEye, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import CATEGORY from "@/constants/informations/category";
import Image from "next/image";

type MyProps = {
  id: number;
  category: string;
  title: string;
  tags: string[];
};

// todo
const InformationItem = ({ id, category, title, tags }: MyProps) => {
  return (
    <div className="relative mx-2 mt-8 flex h-[300px] w-[300px] flex-col justify-between rounded-2xl p-6 duration-300 hover:scale-105">
      <Image
        className="-z-10 rounded-2xl"
        src={"/PostImage.svg"}
        alt={"POstImage"}
        fill={true}
        style={{
          objectFit: "cover",
        }}
      />
      <div className="flex flex-row items-center justify-between">
        <p className="w-fit rounded-full bg-white px-4 py-1 text-sm font-semibold text-gray-500 shadow">
          {category}
        </p>
        <div className="text-white">
          <CiBookmark size={"2rem"} />
        </div>
      </div>
      <div>
        <Link
          className="font-semibold text-white"
          href={`/informations/${CATEGORY.get(category)}/${id}`}
        >
          {title}
        </Link>
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
  );
};

export default InformationItem;
