import { IoIosArrowDown } from "react-icons/io";
import Pagination from "../common/Pagination";
import InformationItem from "../common/InformationItem";
import { VscSettings } from "react-icons/vsc";
import SubCategoryList from "./SubCategoryList";
import InformationFilterModal from "./InformationFilterModal";

type MyProps = {
  category: string;
  subCategory: string;
  isModal: boolean;
  closeModal: () => void;
  openModal: () => void;
};

const InformationList = ({
  category,
  subCategory,
  isModal,
  closeModal,
  openModal,
}: MyProps) => {
  // TODO: API 호출
  const data: {
    category: string;
    title: string;
    image: string;
  }[] = [
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
    },
    {
      category: "맛집",
      title: "책과 공간이 매력적인 테라로사 포스코센터점",
      image: "/restaurant1.svg",
    },
    {
      category: "맛집",
      title: "강릉 오션뷰를 보며 연어덮밥을 먹을 수 있는 루이식당",
      image: "/restaurant2.svg",
    },
    {
      category: "맛집",
      title: "1인 사시미회가 맛있는 제주 애월 닻",
      image: "/restaurant3.svg",
    },
    {
      category: "맛집",
      title: "정갈한 한식 미필담 이북식 손만둣국",
      image: "/restaurant4.svg",
    },
    {
      category: "맛집",
      title: "면과 국물이 무한리필 되는 쌀국수 맛집 미분당",
      image: "/restaurant5.svg",
    },
    {
      category: "맛집",
      title: "강릉역 분위기 좋은 카페 비사이드그라운드",
      image: "/restaurant6.svg",
    },
    {
      category: "맛집",
      title: "제주 성산 단백",
      image: "/restaurant7.svg",
    },
    {
      category: "맛집",
      title: "애견동반이 가능한 경주 베이글베이 글러",
      image: "/restaurant8.svg",
    },
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
    },
    {
      category: "맛집",
      title: "책과 공간이 매력적인 테라로사 포스코센터점",
      image: "/restaurant1.svg",
    },
    {
      category: "맛집",
      title: "강릉 오션뷰를 보며 연어덮밥을 먹을 수 있는 루이식당",
      image: "/restaurant2.svg",
    },
  ];

  return (
    <div className="mt-6 flex w-[60rem] flex-col max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      {isModal && <InformationFilterModal closeModal={closeModal} />}
      <div className="flex flex-row items-center justify-between max-[1024px]:flex-col-reverse max-[1024px]:items-start max-[1024px]:space-y-6 max-[1024px]:space-y-reverse">
        <SubCategoryList category={category} subCategory={subCategory} />
        <div className="flex flex-row items-center gap-4 max-[1024px]:w-full max-[1024px]:justify-between max-[744px]:flex-col max-[744px]:items-start">
          <form className="max-[1024px]:flex-1 max-[744px]:w-full">
            <input
              className="w-64 border-b-[0.0625rem] border-black bg-search-icon bg-[length:1rem] bg-[left_0rem_top_0.1rem] bg-no-repeat pb-1 pl-8 text-sm outline-none placeholder:font-medium placeholder:text-gray2 max-[1024px]:w-full"
              type="text"
              autoComplete="solitour_search"
              name="solitour_search"
              placeholder="제목 또는 키워드를 검색해보세요."
            />
          </form>
          <div className="flex flex-row items-center gap-4 text-sm font-medium text-gray1">
            <button
              className="flex flex-row items-center hover:text-main"
              onClick={openModal}
            >
              <VscSettings size={"1.25rem"} />
              <p>지역별</p>
            </button>
            <button className="flex flex-row items-center hover:text-main">
              <p>인기순</p>
              <IoIosArrowDown />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {data.map((value, index) => (
          <InformationItem
            key={index}
            id={index + 1}
            category={value.category}
            title={value.title}
            image={value.image}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default InformationList;
