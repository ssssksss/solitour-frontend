import { CATEGORY_TEXT } from "@/constants/informations/category";
import { TAGS } from "@/constants/informations/tags";
import Link from "next/link";

type MyProps = {
  category: string;
  tag?: string;
};

const TagButton = (tag: string, buttonText: string) => {
  return (
    <button
      className={
        `${tag === "전체" ? "border-main bg-main text-white hover:text-white" : "text-gray1"}` +
        " " +
        "rounded-full border-2 border-[#E9EBED] px-3 py-1 font-semibold hover:scale-105"
      }
    >
      {buttonText}
    </button>
  );
};

const TagList = ({ category, tag }: MyProps) => {
  const tags = TAGS[category];

  return (
    <div className="flex flex-wrap items-center gap-1">
      {tags.map((value, index) => (
        <Link
          key={index}
          className={
            `${tag === value.query ? "border-main bg-main text-white" : "text-gray1"} ` +
            "rounded-full border-2 border-[#E9EBED] px-3 py-1 font-semibold hover:scale-105"
          }
          href={`/informations/${CATEGORY_TEXT[category]}?tag=${value.query}`}
        >
          {value.buttonText}
        </Link>
      ))}
    </div>
  );
};

export default TagList;
