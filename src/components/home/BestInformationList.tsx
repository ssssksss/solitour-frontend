import { BestInformationResponseDto } from "@/types/InformationDto";
import InformationItem from "../common/InformationItem";
import { CATEGORY_TEXT } from "@/constants/informations/category";
import { cookies } from "next/headers";

/**
 * 좋아요 순으로 3개월 이내에 만들어진 정보 6개를 조회합니다.
 */
async function getBestInformationList() {
  const cookie = cookies().get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations/main-page`,
    {
      method: "GET",
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      next: { revalidate: 60, tags: ["getBestInformationList"] },
    },
  );

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error(response.statusText);
  }

  return response.json() as Promise<BestInformationResponseDto[]>;
}

const BestInformationList = async () => {
  const data = await getBestInformationList();

  return (
    <div className="mt-6 flex w-fit flex-wrap items-center gap-4 p-1 max-[744px]:flex-row max-[744px]:flex-nowrap">
      {data.map((value, index) => (
        <InformationItem
          key={index}
          informationId={value.informationId}
          categoryId={Number(CATEGORY_TEXT[value.parentCategoryName])}
          title={value.title}
          image={value.thumbNailImage}
          address={`${value.zoneCategoryParentName}, ${value.zoneCategoryChildName}`}
          likeCount={value.likeCount}
          viewCount={value.viewCount}
        />
      ))}
    </div>
  );
};

export default BestInformationList;
