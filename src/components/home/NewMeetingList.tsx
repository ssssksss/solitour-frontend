import { useDragScrollType } from "@/hooks/useDragScroll";
import MeetingItem from "../common/MeetingItem";
import Link from "next/link";

type MyProps = {
  scrollHook: useDragScrollType;
};

const NewMeetingList = ({ scrollHook }: MyProps) => {
  // TODO
  const data: {
    category: string;
    bookmark: boolean;
    title: string;
    username: string;
    date: Date;
    location: string;
    time: string;
    current: number;
    total: number;
    qualification: string;
    likes: number;
    views: number;
  }[] = [
    {
      category: "취향",
      bookmark: true,
      title: "🍞강릉 빵지순례 같이 해요!",
      username: "빵빵이",
      date: new Date(),
      location: "강원특별자치도, 강원",
      time: "13:00",
      current: 2,
      total: 4,
      qualification: "(20대, 성별 상관없음)",
      likes: 58,
      views: 113,
    },
    {
      category: "활동",
      bookmark: true,
      title: "동해 서핑 투게더",
      username: "waver",
      date: new Date(),
      location: "강원, 동해시",
      time: "08:00",
      current: 1,
      total: 6,
      qualification: "(30대, 성별 상관없음)",
      likes: 52,
      views: 102,
    },
    {
      category: "활동",
      bookmark: false,
      title: "제주 한라산 같이 등산 할래?",
      username: "등린이",
      date: new Date(),
      location: "제주",
      time: "10:00",
      current: 1,
      total: 4,
      qualification: "(2-30대, 성별 상관없음)",
      likes: 38,
      views: 65,
    },
    {
      category: "취향",
      bookmark: true,
      title: "🍞강릉 빵지순례 같이 해요!",
      username: "빵빵이",
      date: new Date(),
      location: "강원특별자치도, 강원",
      time: "13:00",
      current: 2,
      total: 4,
      qualification: "(20대, 성별 상관없음)",
      likes: 58,
      views: 113,
    },
    {
      category: "활동",
      bookmark: true,
      title: "동해 서핑 투게더",
      username: "waver",
      date: new Date(),
      location: "강원, 동해시",
      time: "08:00",
      current: 1,
      total: 6,
      qualification: "(30대, 성별 상관없음)",
      likes: 52,
      views: 102,
    },
    {
      category: "활동",
      bookmark: false,
      title: "제주 한라산 같이 등산 할래?",
      username: "등린이",
      date: new Date(),
      location: "제주",
      time: "10:00",
      current: 1,
      total: 4,
      qualification: "(2-30대, 성별 상관없음)",
      likes: 38,
      views: 65,
    },
  ];

  return (
    <div className="my-20 w-[60rem] max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <div className="flex flex-row items-center justify-between max-[744px]:justify-center">
        <div className="flex flex-col gap-2 max-[744px]:w-full">
          <div className="flex flex-row items-center justify-between gap-1">
            <h2 className="flex flex-row items-center gap-2 text-2xl font-bold text-black max-[744px]:flex-col max-[744px]:items-start max-[744px]:gap-0">
              <p>{"새로움을 발견할,"}</p>
              <p>
                <span className="text-main">NEW</span> 모임
              </p>
            </h2>
            <Link
              className="hidden h-[2.3125rem] w-[5.8125rem] items-center justify-center rounded-full border-[0.0625rem] border-gray3 text-gray1 hover:border-main hover:bg-main hover:text-white max-[744px]:flex"
              href="/meetings"
            >
              전체보기
            </Link>
          </div>
          <p className="text-sm font-medium text-gray1">
            솔리투어에서 새로운 사람들과 최신 모임을 찾아보세요!
          </p>
        </div>
        <Link
          className="flex h-[2.3125rem] w-[5.8125rem] items-center justify-center rounded-full border-[0.0625rem] border-gray3 text-gray1 hover:border-main hover:bg-main hover:text-white max-[744px]:hidden"
          href="/meetings"
        >
          전체보기
        </Link>
      </div>
      <div
        className="overflow-x-auto"
        ref={scrollHook.listRef}
        onMouseDown={(e) => {
          e.preventDefault();
          scrollHook.onDragStart(e);
        }}
        onMouseMove={scrollHook.onDragMove}
        onMouseUp={scrollHook.onDragEnd}
        onMouseLeave={scrollHook.onDragEnd}
        onTouchStart={scrollHook.onTouchStart}
        onTouchMove={scrollHook.onTouchMove}
        onTouchEnd={scrollHook.onTouchEnd}
      >
        <div className="mt-6 flex w-fit flex-wrap items-center justify-center gap-4 p-1 max-[744px]:flex-row max-[744px]:flex-nowrap">
          {data.map((post, index) => (
            <MeetingItem
              key={index}
              id={index + 1}
              category={post.category}
              bookmark={post.bookmark}
              title={post.title}
              username={post.username}
              date={post.date}
              location={post.location}
              time={post.time}
              current={post.current}
              total={post.total}
              qualification={post.qualification}
              likes={post.likes}
              views={post.views}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewMeetingList;
