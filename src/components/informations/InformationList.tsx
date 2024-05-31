import CategoryButton from "../common/CategoryButton";
import InformationItem from "./InformationItem";

const InformationList = () => {
  // todo
  const data: { category: string; title: string; tags: string[] }[] = [
    {
      category: "맛집",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
  ];

  return (
    <div className="mt-20 flex w-[960px] flex-col">
      <div className="flex flex-row items-center justify-between">
        <div className="space-x-2">
          <CategoryButton>전체</CategoryButton>
          <CategoryButton>혼밥</CategoryButton>
          <CategoryButton>혼카페</CategoryButton>
          <CategoryButton>혼술</CategoryButton>
        </div>
        <div>조회순</div>
      </div>
      <div className="flex flex-wrap justify-between">
        {data.map((value, index) => (
          <InformationItem
            key={index}
            category={value.category}
            title={value.title}
            tags={value.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default InformationList;
