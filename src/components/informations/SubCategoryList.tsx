import { CATEGORY_TEXT } from "@/constants/informations/category";
import { SUBCATEGORY } from "@/constants/informations/subCategory";
import Link from "next/link";

type MyProps = {
  category: string;
  subCategory: string;
};

const SubCategoryList = ({ category, subCategory }: MyProps) => {
  const subCategories = SUBCATEGORY[category];

  return (
    <div className="flex flex-wrap items-center gap-1">
      {subCategories.map((value, index) => (
        <Link
          key={index}
          className={
            `${subCategory === value.query ? "border-main bg-main text-white" : "text-gray1"} ` +
            "rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105"
          }
          href={`/informations/list/${CATEGORY_TEXT[category]}?subCategory=${value.query}`}
        >
          {value.buttonText}
        </Link>
      ))}
    </div>
  );
};

export default SubCategoryList;
