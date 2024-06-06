import MeetingsItem from "../meettings/MeetingsItem";
import BoardItem from "./BoardItem";

type MyBoardListProps = {
    data: (| {
        id: number;
        category: string;
        title: string;
        image: string;
        tags: string[];
  } | {
    id: number;
      category: string;
      title: string;
      userName: string;
      date: string;
      place: string;
      time: string;
      joinMember: number;
      limitMember: number;
  })[]
}

const MyBoardList = ({ data }: MyBoardListProps) => {
  return (
    <div className="flex flex-wrap gap-x-[1.25rem] gap-y-[1.75rem] pt-[2.5rem] justify-center md:justify-start pb-[5rem]">
      {data.map((post) => {
        if ('image' in post) {
          return (
            <BoardItem
              key={"post"+post.id}
              id={post.id}
              category={post.category}
              title={post.title}
              image={post.image}
              tags={post.tags}
            />
          );
        } else {
          return (
            <MeetingsItem
              key={"meeting" + post.id}
              id={post.id}
              category={post.category}
              title={post.title}
              userName={post.userName}
              date={post.date}
              place={post.place}
              time={post.time}
              joinMember={post.joinMember}
              limitMember={post.limitMember}
            />
          );
        }
      })}
    </div>
  );
};

export default MyBoardList;