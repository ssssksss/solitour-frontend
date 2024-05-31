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
    <div className="mt-8 w-[960px] flex flex-wrap justify-between">
      {data.map((value, index) => (
        <InformationItem
          key={index}
          category={value.category}
          title={value.title}
          tags={value.tags}
        />
      ))}
    </div>
  );
};

export default InformationList;
