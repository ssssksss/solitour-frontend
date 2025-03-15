import { InformationCategory } from "@/entities/information";
import Link from "next/link";

interface InformationParentCategoryListProps {
  informationCategoryList: InformationCategory[];
  parentCategoryId: number;
}

export const InformationParentCategoryList = ({
  informationCategoryList,
  parentCategoryId,
}: InformationParentCategoryListProps) => {
  return (
    <div className="mt-[5.5rem] flex w-full flex-row items-center justify-between border-b-[0.0625rem]">
      <nav className="w-fit">
        <ul className="flex flex-row items-center gap-9">
          {informationCategoryList.map((informationCategory) => (
            <Link
              key={informationCategory.id}
              className={[
                informationCategory.id === parentCategoryId
                  ? "border-main text-main border-b-2 font-bold"
                  : "text-gray1",
                "hover:text-main pb-[0.375rem]",
              ].join(" ")}
              href={`/informations/list?page=1&parentCategoryId=${informationCategory.id}`}
              scroll={false}
            >
              {informationCategory.name}
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};
