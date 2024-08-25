import { LOCATION_ID } from "@/constants/informations/location";
import InformationItemContainer from "@/containers/common/InformationItemContainer";
import InformationPaginationContainer from "@/containers/informations/list/InformationPaginationContainer";
import { InformationListResponseDto } from "@/types/InformationDto";
import { cookies } from "next/headers";

async function getInformationList(
  isParentCategory: boolean,
  categoryId: number,
  page: number,
  place?: string,
  order?: string,
) {
  const cookie = cookies().get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations/${isParentCategory ? "parent-category" : "child-category"}/${categoryId}?page=${page}${order !== undefined && order !== "latest" ? `&sort=${order}` : ""}${place !== undefined ? `&zoneCategory=${LOCATION_ID[place]}` : ""}`,
    {
      method: "GET",
      headers: {
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
  isParentCategory: boolean;
  categoryId: number;
  page: number;
  place?: string;
  order?: string;
}

const InformationList = async ({
  isParentCategory,
  categoryId,
  page,
  place,
  order,
}: Props) => {
  const data = await getInformationList(
    isParentCategory,
    categoryId,
    page - 1,
    place,
    order,
  );

  return (
    <div className="flex w-full flex-col">
      <div className="mt-6 grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
        {data.content.map((value) => (
          <InformationItemContainer
            key={value.informationId}
            informationId={value.informationId}
            categoryId={categoryId}
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
        totalPages={data.totalPages}
      />
    </div>
  );
};

export default InformationList;
