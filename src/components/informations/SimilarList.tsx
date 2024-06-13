import InformationItem from "../common/InformationItem";

const SimilarList = () => {
  // TODO
  const data: {
    category: string;
    title: string;
    image: string;
    tags: string[];
  }[] = [
    {
      category: "맛집",
      title: "빈티지 분위기의 카페 합정 앤트러사이트",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "취향대로 골라 마시는 핸드드립커피 보사노바 잠실점",
      image: "/PostImage2.svg",
      tags: ["제주 월정리", "1인 게하"],
    },
    {
      category: "맛집",
      title: "초록 창밖 뷰에 분위기까지 갖춘 연희동 혹스턴",
      image: "/PostImage3.svg",
      tags: ["미술관", "안국역", "전시"],
    },
  ];

  return (
    <div className="my-20 w-[60rem] max-[1024px]:w-[90%]">
      <h2 className="text-2xl font-bold text-black">게시물과 비슷한 곳</h2>
      <div className="flex flex-wrap items-center justify-around">
        {data.map((post, index) => (
          <InformationItem
            key={index}
            id={index + 1}
            category={post.category}
            title={post.title}
            image={post.image}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarList;