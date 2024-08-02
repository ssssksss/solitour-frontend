import InformationItem from "@/components/common/InformationItem";
import { LOCATION_ID } from "@/constants/informations/location";
import PaginationContainer from "@/containers/common/PaginationContainer";
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
  let response: Response;

  switch (order) {
    case "like-count":
    case "view-count":
      response = await fetch(
        `${process.env.BACKEND_URL}/api/informations/${isParentCategory ? "parent-category" : "child-category"}/${categoryId}/${order}?page=${page}&${place !== undefined ? `zoneCategory=${LOCATION_ID[place]}` : ""}`,
        {
          method: "GET",
          headers: {
            Cookie: `${cookie?.name}=${cookie?.value}`,
          },
          next: { revalidate: 60, tags: ["getInformationList"] },
        },
      );
      break;
    case "latest":
    case undefined:
      response = await fetch(
        `${process.env.BACKEND_URL}/api/informations/${isParentCategory ? "parent-category" : "child-category"}/${categoryId}?page=${page}&${place !== undefined ? `zoneCategory=${LOCATION_ID[place]}` : ""}`,
        {
          method: "GET",
          headers: {
            Cookie: `${cookie?.name}=${cookie?.value}`,
          },
          next: { revalidate: 60, tags: ["getInformationList"] },
        },
      );
      break;
    default:
      throw new Error("Invalid Order");
  }

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error("Failed to fetch data");
  }

  return response.json() as Promise<InformationListResponseDto>;

  //${place !== undefined ? "&place=" + place : ""}${order !== undefined ? "&order=" + order : ""}
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
      <div className="mt-6 flex flex-wrap gap-5">
        {data.content.map((value) => (
          <InformationItem
            key={value.informationId}
            categoryId={categoryId}
            informationId={value.informationId}
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
      <PaginationContainer currentPage={page} totalPages={data.totalPages} />
    </div>
  );
};

export default InformationList;
