import { BestInformationResponseDto } from "@/types/InformationDto";
import { cookies } from "next/headers";
import InformationItem from "../common/InformationItem";
import { LottieNotFound } from "@/shared/ui/lottie";

/**
 * 좋아요 순으로 3개월 이내에 만들어진 정보 6개를 조회합니다.
 */
async function getBestInformationList() {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations/main-page`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      next: { revalidate: 60, tags: ["getBestInformationList"] },
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<BestInformationResponseDto[]>;
}

const BestInformationList = async () => {
  const data = await getBestInformationList();

  if (data.length === 0) {
    return (
      <div className="flex w-full flex-col items-center pb-12">
        <LottieNotFound text="여행 정보를 작성해 보세요." />
      </div>
    );
  }

  return (
    <div className="mt-6 grid w-full grid-cols-3 items-center gap-4 p-1 max-[1024px]:grid-cols-2 max-[744px]:flex max-[744px]:w-fit">
      {data.map((value) => (
        <InformationItem
          key={value.informationId}
          informationId={value.informationId}
          categoryName={value.parentCategoryName}
          initialIsBookMarked={value.isBookMark}
          isLike={value.isLike}
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
