import { InformationCategoryListWrapper } from "@/widgets/informationCategoryListWrapper";
import { InformationListWrapper } from "@/widgets/informationListWrapper";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  const page = Number(params["page"]);
  if (page <= 0 || !Number.isSafeInteger(page)) {
    throw new Error("Invalid Page Number");
  }

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
      <InformationListWrapper
        page={page}
        parentCategoryId={parentCategoryId}
        childCategoryId={childCategoryId}
        place={params["place"]}
        order={params["order"]}
        tagName={params["tagName"]}
        search={params["search"]}
      />
    </div>
  );
}
