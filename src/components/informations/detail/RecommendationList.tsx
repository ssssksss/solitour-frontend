import InformationItem from "@/components/common/InformationItem";

const RecommendationList = async () => {
  // TODO
  const data: {
    category: string;
    title: string;
    image: string;
  }[] = [
    {
      category: "restaurant",
      title: "빈티지 분위기의 카페 합정 앤트러사이트",
      image: "/PostImage.svg",
    },
    {
      category: "restaurant",
      title: "취향대로 골라 마시는 핸드드립커피 보사노바 잠실점",
      image: "/PostImage2.svg",
    },
    {
      category: "restaurant",
      title: "초록 창밖 뷰에 분위기까지 갖춘 연희동 혹스턴",
      image: "/PostImage3.svg",
    },
  ];

  return (
    <div className="my-20 w-[60rem] max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <h2 className="text-2xl font-bold text-black dark:text-slate-200">
        추천 정보
      </h2>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        {data.map((post, index) => (
          <InformationItem
            key={index}
            informationId={index + 1}
            categoryId={1}
            title={post.title}
            image={post.image}
            address="테스트 주소"
            likeCount={123}
            viewCount={12}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;
