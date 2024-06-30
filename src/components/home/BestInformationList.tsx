import InformationItem from "../common/InformationItem";

const BestInformationList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO
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
      category: "accommodation",
      title: "다양한 프로그램이 있는 제주 월정리 게하",
      image: "/PostImage2.svg",
    },
    {
      category: "activity",
      title: "혼자 놀기 초보도 가능한 국립현대미술관",
      image: "/PostImage3.svg",
    },
    {
      category: "restaurant",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
    },
    {
      category: "accommodation",
      title: "다양한 프로그램이 있는 제주 월정리 게하",
      image: "/PostImage2.svg",
    },
    {
      category: "activity",
      title: "혼자 놀기 초보도 가능한 국립현대미술관",
      image: "/PostImage3.svg",
    },
  ];

  return (
    <div className="mt-6 flex w-fit flex-wrap items-center justify-center gap-4 p-1 max-[744px]:flex-row max-[744px]:flex-nowrap">
      {data.map((post, index) => (
        <InformationItem
          key={index}
          id={index + 1}
          category={post.category}
          title={post.title}
          image={post.image}
        />
      ))}
    </div>
  );
};

export default BestInformationList;
