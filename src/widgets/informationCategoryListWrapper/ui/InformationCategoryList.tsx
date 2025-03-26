"use client";

import { InformationCategory } from "@/entities/information";
import { InformationParentCategoryList } from "./InformationParentCategoryList";
import { InformationChildCategoryList } from "./InformationChildCategoryList";
import { InformationSearch } from "@/features/informationSearch";
import { InformationFilter } from "@/features/informationFilter";
import { InformationSort } from "@/features/informationSort";
import { use } from "react";
import { useSearchParams } from "next/navigation";

interface InformationCategoryListProps {
  informationCategoryListPromise: Promise<InformationCategory[]>;
}

export const InformationCategoryList = ({
  informationCategoryListPromise,
}: InformationCategoryListProps) => {
  const informationCategoryList = use(informationCategoryListPromise);
  const searchParams = useSearchParams();
  const parentCategoryId = Number(searchParams.get("parentCategoryId") ?? 0);
  const childCategoryId = Number(searchParams.get("childCategoryId") ?? 0);

  return (
    <div className="mt-6 flex w-full flex-col gap-6">
      <InformationParentCategoryList
        informationCategoryList={informationCategoryList}
        parentCategoryId={Number(searchParams.get("parentCategoryId") ?? 0)}
      />
      <div className="flex flex-row items-center justify-between max-[1024px]:flex-col-reverse max-[1024px]:items-start max-[1024px]:space-y-6 max-[1024px]:space-y-reverse">
        <InformationChildCategoryList
          informationCategoryList={informationCategoryList}
          parentCategoryId={parentCategoryId}
          childCategoryId={childCategoryId}
        />
        <div className="flex flex-row items-center gap-4 max-[1024px]:w-full max-[1024px]:justify-between max-[744px]:flex-col max-[744px]:items-start">
          <InformationSearch />
          <InformationFilter />
          <InformationSort />
        </div>
      </div>
    </div>
  );
};
