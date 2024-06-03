import { IoIosArrowDown } from "react-icons/io";
import CategoryButton from "../common/CategoryButton";
import Pagination from "../common/Pagination";
import InformationItem from "./InformationItem";
import { VscSettings } from "react-icons/vsc";
import { MdOutlineMenu } from "react-icons/md";

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
            tags={value.tags}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default InformationList;
