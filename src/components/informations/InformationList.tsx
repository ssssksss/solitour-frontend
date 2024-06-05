import { IoIosArrowDown } from "react-icons/io";
import CategoryButton from "../common/CategoryButton";
import Pagination from "../common/Pagination";
import InformationItem from "../common/PostItem";
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
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
    },
  ];

  return (
    <div className="mt-32 flex w-[960px] flex-col max-[1024px]:w-[90%]">
      <div className="flex flex-row items-center justify-between">
        <button className="hidden items-center pr-8 text-sm font-black text-neutral-500 max-[1024px]:flex">
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
              className="w-[95%] border-b-[1px] border-black bg-search-icon bg-[length:1rem] bg-left bg-no-repeat pl-8 outline-none"
              type="text"
              autoComplete="search"
              name="search"
              placeholder="검색하기"
            />
          </form>
          <button className="flex flex-row items-center text-sm font-black text-neutral-500">
            <VscSettings size={"1.25rem"} />
            <p className="max-[768px]:hidden">지역별</p>
          </button>
          <button className="flex flex-row items-center text-sm font-black text-neutral-500">
            <p className="max-[768px]:hidden">인기순</p>
            <IoIosArrowDown />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly">
        {data.map((value, index) => (
          <InformationItem
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
