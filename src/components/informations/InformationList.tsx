import CategoryButton from "../common/CategoryButton";
import Pagination from "../common/Pagination";
import InformationItem from "./InformationItem";

type MyProps = {
  category: string;
};

const InformationList = ({ category }: MyProps) => {
  // TODO: API 호출
  const data: { category: string; title: string; tags: string[] }[] = [
    {
      category: category,
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: category,
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: category,
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: category,
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: category,
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: category,
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: category,
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: category,
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: category,
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: category,
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: category,
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: category,
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
  ];

  return (
    <div className="mt-32 flex w-[960px] flex-col">
      <div className="flex flex-row items-center justify-between">
        <div className="space-x-2">
          <CategoryButton>전체</CategoryButton>
          <CategoryButton>혼밥</CategoryButton>
          <CategoryButton>혼카페</CategoryButton>
          <CategoryButton>혼술</CategoryButton>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <button className="font-black text-neutral-500">지역별</button>
          <button className="font-black text-neutral-500">인기순</button>
        </div>
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
      <Pagination />
    </div>
  );
};

export default InformationList;
