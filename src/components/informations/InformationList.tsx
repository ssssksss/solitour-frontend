import { IoIosArrowDown } from "react-icons/io";
import CategoryButton from "../common/CategoryButton";
import Pagination from "../common/Pagination";
import PostItem from "../common/PostItem";
import { VscSettings } from "react-icons/vsc";
import { MdOutlineMenu } from "react-icons/md";

type MyProps = {
  category: string;
};

const InformationList = ({ category }: MyProps) => {
  // TODO: API 호출
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
      category: "맛집",
      title: "책과 공간이 매력적인 테라로사 포스코센터점",
      image: "/restaurant1.svg",
      tags: ["북카페", "선릉역", "카공"],
    },
    {
      category: "맛집",
      title: "강릉 오션뷰를 보며 연어덮밥을 먹을 수 있는 루이식당",
      image: "/restaurant2.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "1인 사시미회가 맛있는 제주 애월 닻",
      image: "/restaurant3.svg",
      tags: ["혼술", "애월", "딱새우회"],
    },
    {
      category: "맛집",
      title: "정갈한 한식 미필담 이북식 손만둣국",
      image: "/restaurant4.svg",
      tags: ["이북식음식", "합정", "혼밥"],
    },
    {
      category: "맛집",
      title: "면과 국물이 무한리필 되는 쌀국수 맛집 미분당",
      image: "/restaurant5.svg",
      tags: ["쌀국수", "공덕역"],
    },
    {
      category: "맛집",
      title: "강릉역 분위기 좋은 카페 비사이드그라운드",
      image: "/restaurant6.svg",
      tags: ["혼카페", "강릉역", "아늑한"],
    },
    {
      category: "맛집",
      title: "제주 성산 단백",
      image: "/restaurant7.svg",
      tags: ["흑돼지 맛집", "제주 성산"],
    },
    {
      category: "맛집",
      title: "애견동반이 가능한 경주 베이글베이 글러",
      image: "/restaurant8.svg",
      tags: ["베이글 맛집", "애견동반"],
    },
  ];

  return (
    <div className="mt-4 flex w-[60rem] flex-col max-[1024px]:w-[90%]">
      <div className="flex flex-row items-center justify-between">
        <button className="hidden items-center pr-8 text-sm font-black text-neutral-500 hover:text-main max-[1024px]:flex">
          <MdOutlineMenu size={"1.25rem"} />
          <p className="max-[768px]:hidden">태그</p>
        </button>
        <div className="space-x-2 text-sm max-[1024px]:hidden">
          <CategoryButton>전체</CategoryButton>
          <CategoryButton>혼밥</CategoryButton>
          <CategoryButton>혼카페</CategoryButton>
          <CategoryButton>혼술</CategoryButton>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <form>
            <input
              className="w-64 border-b-[0.0625rem] border-black bg-search-icon bg-[length:1rem] bg-left bg-no-repeat pl-8 text-sm outline-none placeholder:font-medium placeholder:text-gray2"
              type="text"
              autoComplete="search"
              name="search"
              placeholder="제목 또는 키워드를 검색해보세요."
            />
          </form>
          <button className="flex flex-row items-center text-sm font-black text-gray1 hover:text-main">
            <VscSettings size={"1.25rem"} />
            <p className="max-[768px]:hidden">지역별</p>
          </button>
          <button className="flex flex-row items-center text-sm font-black text-gray1 hover:text-main">
            <p className="max-[768px]:hidden">인기순</p>
            <IoIosArrowDown />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-between max-[1024px]:justify-around">
        {data.map((value, index) => (
          <PostItem
            key={index}
            id={index + 1}
            category={value.category}
            title={value.title}
            image={value.image}
            tags={value.tags}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default InformationList;
