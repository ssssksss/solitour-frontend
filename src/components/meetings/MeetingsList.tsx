import { Modal } from "@/components/common/modal/Modal";
import Link from "next/link";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { IoIosArrowDown } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import MeetingItem from "../common/MeetingItem";
import Pagination from "../common/Pagination";
import MeetingFilterModal from "./MeetingFilterModal";
import MeetingSubCategoryList from "./MeetingSubCategoryList";

interface IMeetingsList {
  isModal: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const MeetingsList = (props: IMeetingsList) => {
  const data: {
    id: number;
    category: string;
    bookmark: boolean;
    title: string;
    username: string;
    date: Date;
    location: string;
    time: string;
    image: string;
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
    date: new Date(),
    location: "강원, 동해시",
    time: "08:00",
    image: "/dataImage2.svg",
    current: 1,
    total: 6,
    qualification: "(30대, 성별 상관없음)",
    likes: 52,
    views: 102,
  };
  return (
    <div className="flex w-[60rem] flex-col pt-[5.5rem] max-[1024px]:w-[90%]">
      <div className="flex w-full justify-end">
        <Link
          className="flex h-9 w-28 items-center justify-center rounded-full bg-main text-sm font-medium text-white hover:scale-105"
          href="/meetings/write"
        >
          모임 생성하기
        </Link>
      </div>
      <div className="flex flex-row items-center justify-between max-[768px]:flex-col-reverse max-[768px]:items-start max-[768px]:space-y-6 max-[768px]:space-y-reverse">
        <MeetingSubCategoryList category={"모임"} subCategory={"all"} />
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
            <button className="flex flex-row items-center hover:text-main">
              <VscSettings size={"1.25rem"} />
              <button onClick={() => props.openModal()}>필터</button>
              <Modal isOpen={props.isModal} onClose={() => props.closeModal()}>
                <MeetingFilterModal closeModal={() => props.closeModal()} />
              </Modal>
            </button>
            <button className="flex flex-row items-center hover:text-main">
              <p>인기순</p>
              <IoIosArrowDown />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <MeetingItem
            key={index}
            id={index + 1}
            category={data.category}
            bookmark={data.bookmark}
            title={data.title}
            username={data.username}
            date={data.date}
            location={data.location}
            time={data.time}
            image={data.image}
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
export default MeetingsList;
