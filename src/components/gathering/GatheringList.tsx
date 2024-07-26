import { Modal } from "@/components/common/modal/Modal";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { IoIosArrowDown } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import GatheringItem from "../common/GatheringItem";
import Pagination from "../common/Pagination";
import GatheringFilterModal from "./GatheringFilterModal";
import GatheringSubCategoryList from "./GatheringSubCategoryList";

interface IGatheringList {
  isModal: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const GatheringList = (props: IGatheringList) => {
  const data: {
    id: number;
    category: string;
    bookmark: boolean;
    title: string;
    username: string;
    date: Date | string;
    location: string;
    time: string;
    current: number;
    total: number;
    qualification: string;
    likes: number;
    views: number;
  } = {
    id: 1,
    category: "활동",
    bookmark: true,
    title: "동해 서핑 투게더",
    username: "waver",
    date: "2024.07.09(화) ~ 2024.07.10(수)",
    location: "제주특별자치도, 제주시",
    time: "08:00",
    current: 1,
    total: 6,
    qualification: "(20 ~ 50세, 성별 무관)",
    likes: 52,
    views: 102,
  };
  return (
    <div className="flex w-[60rem] flex-col pt-[5.5rem] max-[1024px]:w-[90%]">
      <div className="flex flex-row items-center justify-between max-[768px]:flex-col-reverse max-[768px]:items-start max-[768px]:space-y-6 max-[768px]:space-y-reverse">
        <GatheringSubCategoryList category={"모임"} subCategory={"all"} />
        <div className="flex flex-row items-center space-x-4 max-[768px]:w-full max-[768px]:justify-between">
          <form className="max-[768px]:flex-1">
            <input
              className="w-64 border-b-[0.0625rem] border-black bg-search-icon bg-[length:1rem] bg-[left_0rem_top_0.1rem] bg-no-repeat pb-1 pl-8 text-sm outline-none placeholder:font-medium placeholder:text-gray2 max-[768px]:w-full"
              type="text"
              autoComplete="search"
              name="search"
              placeholder="검색하기"
            />
          </form>
          <div className="flex flex-row items-center gap-4 text-sm font-medium text-gray1">
            <button
              className="flex flex-row items-center hover:text-main"
              onClick={() => props.openModal()}
            >
              <VscSettings size={"1.25rem"} />
              <div>필터</div>
            </button>
            <Modal isOpen={props.isModal} onClose={() => props.closeModal()}>
              <GatheringFilterModal closeModal={() => props.closeModal()} />
            </Modal>
            <button className="flex flex-row items-center hover:text-main">
              <p>인기순</p>
              <IoIosArrowDown />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-7">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <GatheringItem
            key={index}
            id={index + 1}
            category={data.category}
            bookmark={data.bookmark}
            title={data.title}
            username={data.username}
            date={data.date}
            location={data.location}
            time={data.time}
            current={data.current}
            total={data.total}
            qualification={data.qualification}
            likes={data.likes}
            views={data.views}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};
export default GatheringList;
