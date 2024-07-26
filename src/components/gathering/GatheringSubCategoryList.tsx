import { CATEGORY_TEXT } from "@/constants/gathering/category";
import { SUBCATEGORY } from "@/constants/gathering/subCategory";
import Link from "next/link";

interface Props {
  category: string;
  subCategory: string;
}

const GatheringSubCategoryList = ({ category, subCategory }: Props) => {
  const subCategories = SUBCATEGORY[category];

  return (
    <div className="flex flex-wrap items-center gap-1">
      {subCategories.map((value, index) => (
        <Link
          key={index}
          className={
            `${subCategory === value.query ? "border-main bg-main text-white" : "text-gray1"} ` +
            "rounded-full border-2 border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105"
          }
          href={`/gathering/${CATEGORY_TEXT[category]}?subCategory=${value.query}`}
        >
          {value.buttonText}
        </Link>
      ))}
    </div>
  );
};

export default GatheringSubCategoryList;
