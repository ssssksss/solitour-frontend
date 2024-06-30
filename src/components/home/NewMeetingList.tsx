import MeetingItem from "../common/MeetingItem";

const NewMeetingList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

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
  );
};

export default NewMeetingList;
