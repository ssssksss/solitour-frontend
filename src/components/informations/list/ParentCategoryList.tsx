import { CategoryResponseDto } from "@/types/CategoryDto";
import Link from "next/link";

interface Props {
  categories: CategoryResponseDto[];
  parentCategoryId: number;
}

const ParentCategoryList = ({ categories, parentCategoryId }: Props) => {
  return (
    <div className="mt-[5.5rem] flex w-full flex-row items-center justify-between border-b-[0.0625rem] dark:border-slate-200">
      <nav className="w-fit">
        <ul className="flex flex-row items-center gap-9">
          {categories.map((category, index) => (
            <Link
              key={index}
              className={
                `${
                  category.id === parentCategoryId
                    ? "border-b-2 border-main font-bold text-main"
                    : "text-gray1 dark:text-slate-400"
                } ` + "pb-[0.375rem] hover:text-main"
              }
              href={`/informations/list?page=1&parentCategoryId=${category.id}`}
              scroll={false}
            >
              {category.name}
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ParentCategoryList;
