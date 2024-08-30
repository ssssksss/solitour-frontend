import { LOCATION_ID } from "@/constants/informations/location";
import InformationItemContainer from "@/containers/common/InformationItemContainer";
import InformationPaginationContainer from "@/containers/informations/list/InformationPaginationContainer";
import { InformationListResponseDto } from "@/types/InformationDto";
import { cookies } from "next/headers";

async function getInformationList(
  page: number,
  parentCategoryId: number,
  childCategoryId: number,
  place?: string,
  order?: string,
  tagName?: string,
) {
  const cookie = cookies().get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations${tagName !== undefined ? `/tag/search` : ""}?page=${page}&parentCategoryId=${parentCategoryId}${childCategoryId > 0 ? `&childCategoryId=${childCategoryId}` : ""}${place !== undefined ? `&zoneCategoryId=${LOCATION_ID[place]}` : ""}${order !== undefined && order !== "latest" ? `&sort=${order}` : ""}${tagName !== undefined ? `&tagName=${encodeURIComponent(tagName)}` : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      next: { revalidate: 60, tags: ["getInformationList"] },
    },
  );

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error(response.statusText);
  }

  return response.json() as Promise<InformationListResponseDto>;
}

interface Props {
  page: number;
  parentCategoryId: number;
  childCategoryId: number;
  place?: string;
  order?: string;
  tagName?: string;
}

const InformationList = async ({
  page,
  parentCategoryId,
  childCategoryId,
  place,
  order,
  tagName,
}: Props) => {
  const data = await getInformationList(
    page - 1,
    parentCategoryId,
    childCategoryId,
    place,
    order,
    tagName,
  );

  return (
    <div className="flex w-full flex-col">
      <div className="mt-6 grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
        {data.content.map((value) => (
          <InformationItemContainer
            key={value.informationId}
            informationId={value.informationId}
            categoryId={parentCategoryId}
            isBookMark={value.isBookMark}
            title={value.title}
            image={value.thumbNailImage}
            address={
              value.zoneCategoryParentName + ", " + value.zoneCategoryChildName
            }
            likeCount={value.likeCount}
            viewCount={value.viewCount}
          />
        ))}
      </div>
      <InformationPaginationContainer
        currentPage={page}
        totalPages={data.page.totalPages}
      />
    </div>
  );
};

export default InformationList;
