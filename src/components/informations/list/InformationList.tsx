import LottieNotFound from "@/components/common/lottie/LottieNotFound";
import { LOCATION_ID } from "@/constants/informations/location";
import { InformationListResponseDto } from "@/types/InformationDto";
import { cookies } from "next/headers";
import InformationPagination from "./InformationPagination";
import InformationItem from "@/components/common/InformationItem";

async function getInformationList(
  page: number,
  parentCategoryId: number,
  childCategoryId: number,
  place?: string,
  order?: string,
  tagName?: string,
  search?: string,
) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations${tagName !== undefined ? "/tag/search" : ""}?page=${page}&parentCategoryId=${parentCategoryId}${childCategoryId > 0 ? `&childCategoryId=${childCategoryId}` : ""}${place !== undefined ? `&zoneCategoryId=${LOCATION_ID[place]}` : ""}${order !== undefined && order !== "latest" ? `&sort=${order}` : ""}${tagName !== undefined ? `&tagName=${encodeURIComponent(tagName)}` : ""}${search !== undefined ? `&search=${search}` : ""}`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error(response.statusText);
  }

  return response.json() as Promise<InformationListResponseDto>;
}

interface InformationListProps {
  page: number;
  parentCategoryId: number;
  childCategoryId: number;
  place?: string;
  order?: string;
  tagName?: string;
  search?: string;
}

const InformationList = async ({
  page,
  parentCategoryId,
  childCategoryId,
  place,
  order,
  tagName,
  search,
}: InformationListProps) => {
  const data = await getInformationList(
    page - 1,
    parentCategoryId,
    childCategoryId,
    place,
    order,
    tagName,
    search,
  );

  return (
    <div className="flex w-full flex-col">
      {data.content.length > 0 ? (
        <div className="mt-6 flex flex-col">
          <div className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
            {data.content.map((value) => (
              <InformationItem
                key={value.informationId}
                informationId={value.informationId}
                categoryName={value.categoryName}
                initialIsBookMarked={value.isBookMark}
                isLike={value.isLike}
                title={value.title}
                image={value.thumbNailImage}
                address={
                  value.zoneCategoryParentName +
                  ", " +
                  value.zoneCategoryChildName
                }
                likeCount={value.likeCount}
                viewCount={value.viewCount}
              />
            ))}
          </div>
          <InformationPagination
            currentPage={page}
            totalPages={data.page.totalPages}
          />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center pb-12">
          <LottieNotFound text={"찾는 내용이 없습니다."} />
        </div>
      )}
    </div>
  );
};

export default InformationList;
