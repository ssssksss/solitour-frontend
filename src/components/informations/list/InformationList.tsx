import InformationItem from "@/components/common/InformationItem";
import Pagination from "@/components/common/Pagination";
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
    `${process.env.BACKEND_URL}/api/informations/${isParentCategory ? "parent-category" : "child-category"}/${categoryId}?page=${page}${place !== undefined ? "&place=" + place : ""}${order !== undefined ? "&order=" + order : ""}`,
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
    throw new Error("Failed to fetch data");
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
  //const data = await getInformationList(isParentCategory, categoryId, page);

  // TODO: API 호출
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data: {
    category: string;
    title: string;
    image: string;
  }[] = [
    {
      category: "restaurant",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
    },
    {
      category: "restaurant",
      title: "책과 공간이 매력적인 테라로사 포스코센터점",
      image: "/restaurant1.svg",
    },
    {
      category: "restaurant",
      title: "강릉 오션뷰를 보며 연어덮밥을 먹을 수 있는 루이식당",
      image: "/restaurant2.svg",
    },
    {
      category: "restaurant",
      title: "1인 사시미회가 맛있는 제주 애월 닻",
      image: "/restaurant3.svg",
    },
    {
      category: "restaurant",
      title: "정갈한 한식 미필담 이북식 손만둣국",
      image: "/restaurant4.svg",
    },
    {
      category: "restaurant",
      title: "면과 국물이 무한리필 되는 쌀국수 맛집 미분당",
      image: "/restaurant5.svg",
    },
    {
      category: "restaurant",
      title: "강릉역 분위기 좋은 카페 비사이드그라운드",
      image: "/restaurant6.svg",
    },
    {
      category: "restaurant",
      title: "제주 성산 단백",
      image: "/restaurant7.svg",
    },
    {
      category: "restaurant",
      title: "애견동반이 가능한 경주 베이글베이 글러",
      image: "/restaurant8.svg",
    },
    {
      category: "restaurant",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
    },
    {
      category: "restaurant",
      title: "책과 공간이 매력적인 테라로사 포스코센터점",
      image: "/restaurant1.svg",
    },
    {
      category: "restaurant",
      title: "강릉 오션뷰를 보며 연어덮밥을 먹을 수 있는 루이식당",
      image: "/restaurant2.svg",
    },
  ];

  return (
    <div className="flex w-[60rem] flex-col max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {data.map((value, index) => (
          <InformationItem
            key={index}
            id={index + 1}
            category={value.category}
            title={value.title}
            image={value.image}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default InformationList;
