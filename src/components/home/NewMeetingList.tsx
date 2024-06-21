import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MeetingItem from "../common/MeetingItem";

const NewMeetingList = () => {
  // TODO
  const data: {
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
  }[] = [
    {
      category: "취향",
      bookmark: true,
      title: "🍞강릉 빵지순례 같이 해요!",
      username: "빵빵이",
      date: new Date(),
      location: "강원특별자치도, 강원",
      time: "13:00",
      image: "/meeting1.svg",
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
      image: "/PostImage2.svg",
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
      image: "/PostImage3.svg",
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
      image: "/meeting1.svg",
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
      image: "/PostImage2.svg",
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
      image: "/PostImage3.svg",
      current: 1,
      total: 4,
      qualification: "(2-30대, 성별 상관없음)",
      likes: 38,
      views: 65,
    },
  ];

  return (
    <div className="my-20 w-[60rem] max-[1024px]:w-[90%]">
      <div className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-black max-[768px]:text-xl">
            새로움을 발견할, <span className="text-main">NEW</span> 모임
          </h2>
          <p className="text-sm font-medium text-gray1 max-[768px]:text-xs">
            솔리투어에서 새로운 사람들과 최신 모임을 찾아보세요!
          </p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray3 hover:border-black hover:bg-black hover:text-white">
            <IoIosArrowBack size={"1.25rem"} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray3 hover:border-black hover:bg-black hover:text-white">
            <IoIosArrowForward size={"1.25rem"} />
          </button>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
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
            image={post.image}
            current={post.current}
            total={post.total}
            qualification={post.qualification}
            likes={post.likes}
            views={post.views}
          />
        ))}
      </div>
    </div>
  );
};

export default NewMeetingList;
