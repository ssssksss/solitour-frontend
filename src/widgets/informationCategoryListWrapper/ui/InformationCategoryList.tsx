import { getInformationCategoryList } from "@/entities/information";
import { InformationParentCategoryList } from "./InformationParentCategoryList";
import { InformationChildCategoryList } from "./InformationChildCategoryList";
import { InformationSearch } from "@/features/informationSearch";
import { InformationFilter } from "@/features/informationFilter";

interface InformationCategoryListProps {
  parentCategoryId: number;
  childCategoryId: number;
}

export const InformationCategoryList = async ({
  parentCategoryId,
  childCategoryId,
}: InformationCategoryListProps) => {
  const informationCategoryList = await getInformationCategoryList();

  return (
    <div className="mt-6 flex w-full flex-col gap-6">
      <InformationParentCategoryList
        informationCategoryList={informationCategoryList}
        parentCategoryId={parentCategoryId}
      />
      <div className="flex flex-row items-center justify-between max-[1024px]:flex-col-reverse max-[1024px]:items-start max-[1024px]:space-y-6 max-[1024px]:space-y-reverse">
        <InformationChildCategoryList
          informationCategoryList={informationCategoryList}
          parentCategoryId={parentCategoryId}
          childCategoryId={childCategoryId}
        />
        <div className="flex flex-row items-center gap-4 max-[1024px]:w-full max-[1024px]:justify-between max-[744px]:flex-col max-[744px]:items-start">
          <InformationFilter />
          <InformationSearch />
        </div>
      </div>
    </div>
  );
};
