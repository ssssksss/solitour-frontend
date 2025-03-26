import { InformationCategoryListWrapper } from "@/widgets/informationCategoryListWrapper";
import { InformationList } from "@/widgets/informationList";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  const parentCategoryId = Number(params["parentCategoryId"]);
  if (parentCategoryId <= 0 || !Number.isSafeInteger(parentCategoryId)) {
    throw new Error("Invalid ParentCategoryId");
  }

  const childCategoryId = Number(params["childCategoryId"] || 0);
  if (childCategoryId < 0 || !Number.isSafeInteger(childCategoryId)) {
    throw new Error("Invalid ChildCategoryId");
  }

  return (
    <div className="flex w-full flex-col items-center">
      <InformationCategoryListWrapper
        parentCategoryId={parentCategoryId}
        childCategoryId={childCategoryId}
      />
      <InformationList />
    </div>
  );
}
