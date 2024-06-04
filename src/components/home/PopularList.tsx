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
  const data: { category: string; title: string; tags: string[] }[] = [
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "숙박",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
    {
      category: "액티비티",
      title: "서촌 분위기 있는 혼술 카페 여기 있어!",
      tags: ["혼술집", "서촌", "아늑한"],
    },
  ];

  return (
    <div className="my-20 w-[960px]">
      <div className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <div className="flex flex-row items-center space-x-2">
            <IoMdInformationCircleOutline size={"1.5rem"} />
            <h2 className="text-2xl font-bold">인기 여행 정보</h2>
          </div>
          <p className="text-sm font-medium text-neutral-500">
            다양한 여행 정보를 찾아보세요!
          </p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <button className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-neutral-300 hover:scale-105">
            <IoIosArrowBack size={"1rem"} />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-neutral-300 hover:scale-105">
            <IoIosArrowForward size={"1rem"} />
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        {data.map((post, index) => (
          <PostItem
            key={index}
            id={index + 1}
            category={post.category}
            title={post.title}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularList;
