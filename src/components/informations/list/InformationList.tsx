import LottieComponent from "@/components/common/lottie/LottieComponent";
import { LOCATION_ID } from "@/constants/informations/location";
import InformationItemContainer from "@/containers/common/InformationItemContainer";
import InformationPaginationContainer from "@/containers/informations/list/InformationPaginationContainer";
import { InformationListResponseDto } from "@/types/InformationDto";
import { cookies } from "next/headers";
import LottieFile from "@/../public/lottie/list-not-found.json";

async function getInformationList(
  page: number,
  parentCategoryId: number,
  childCategoryId: number,
  place?: string,
  order?: string,
  tagName?: string,
  search?: string,
) {
  const cookie = cookies().get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations${tagName !== undefined ? `/tag/search` : ""}?page=${page}&parentCategoryId=${parentCategoryId}${childCategoryId > 0 ? `&childCategoryId=${childCategoryId}` : ""}${place !== undefined ? `&zoneCategoryId=${LOCATION_ID[place]}` : ""}${order !== undefined && order !== "latest" ? `&sort=${order}` : ""}${tagName !== undefined ? `&tagName=${encodeURIComponent(tagName)}` : ""}${search !== undefined ? `&search=${search}` : ""}`,
    {
      method: "GET",
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      cache: "no-store",
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
}: Props) => {
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
              <InformationItemContainer
                key={value.informationId}
                informationId={value.informationId}
                categoryId={parentCategoryId}
                isBookMark={value.isBookMark}
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
          <InformationPaginationContainer
            currentPage={page}
            totalPages={data.page.totalPages}
          />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center pb-12">
          <LottieComponent lottieFile={LottieFile} className={"w-[20rem]"} />
          <p> 찾는 내용이 없습니다. </p>
        </div>
      )}
    </div>
  );
};

export default InformationList;
