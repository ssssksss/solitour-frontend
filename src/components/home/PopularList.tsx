import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import PostItem from "../common/PostItem";

type MyProps = {
  title?: string;
};

const PopularList = ({ title }: MyProps) => {
  // TODO
  const data: {
    category: string;
    title: string;
    image: string;
    tags: string[];
  }[] = [
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "숙박",
      title: "다양한 프로그램이 있는 제주 월정리 게하",
      image: "/PostImage2.svg",
      tags: ["제주 월정리", "1인 게하"],
    },
    {
      category: "액티비티",
      title: "혼자 놀기 초보도 가능한 국립현대미술관",
      image: "/PostImage3.svg",
      tags: ["미술관", "안국역", "전시"],
    },
  ];

  return (
    <div className="my-20 w-[960px] max-[1024px]:w-[90%]">
      <div className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <div className="flex flex-row items-center space-x-2">
            <div className="h-6 w-6 bg-[#D9D9D9]" />
            <h2 className="text-2xl font-bold">인기 여행 정보</h2>
          </div>
          <p className="text-sm font-medium text-[#666666]">
            솔리에서 다양한 여행 정보를 찾아보세요!
          </p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <button className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-neutral-300 hover:scale-105">
            <IoIosArrowBack size={"1.25rem"} />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white hover:scale-105">
            <IoIosArrowForward size={"1.25rem"} />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-around">
        {data.map((post, index) => (
          <PostItem
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

export default PopularList;
