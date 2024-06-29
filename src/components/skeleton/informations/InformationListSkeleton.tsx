import SubCategoryList from "@/components/informations/SubCategoryList";
import InformationItemSkeleton from "../common/InformationItemSkeleton";
import PaginationSkeleton from "../common/PaginationSkeleton";

type MyProps = {
  category: string;
  subCategory: string;
};

const InformationListSkeleton = ({ category, subCategory }: MyProps) => {
  return (
    <div className="mt-6 flex w-[60rem] flex-col max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <div className="flex flex-row items-center justify-between max-[1024px]:flex-col-reverse max-[1024px]:items-start max-[1024px]:space-y-6 max-[1024px]:space-y-reverse">
        <SubCategoryList category={category} subCategory={subCategory} />
        <div className="flex flex-row items-center gap-4 max-[1024px]:w-full max-[1024px]:justify-between max-[744px]:flex-col max-[744px]:items-start">
          <form className="max-[1024px]:flex-1 max-[744px]:w-full">
            <input
              className="w-64 border-b-[0.0625rem] border-black bg-search-icon bg-[length:1rem] bg-[left_0rem_top_0.1rem] bg-no-repeat pb-1 pl-8 text-sm outline-none placeholder:font-medium placeholder:text-gray2 max-[1024px]:w-full"
              type="text"
              autoComplete="search"
              name="search"
              placeholder="제목 또는 키워드를 검색해보세요."
            />
          </form>
          <div className="flex flex-row items-center gap-4 text-sm font-medium text-gray1">
            <button className="flex flex-row items-center hover:text-main">
              {/* <VscSettings size={"1.25rem"} /> */}
              <p>지역별</p>
            </button>
            <button className="flex flex-row items-center hover:text-main">
              <p>인기순</p>
              {/* <IoIosArrowDown /> */}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
          <InformationItemSkeleton key={value} />
        ))}
      </div>
      <PaginationSkeleton />
    </div>
  );
};

export default InformationListSkeleton;
