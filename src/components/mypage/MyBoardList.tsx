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
    <div className="gap-x-[.5rem] gap-y-[1.75rem] pb-[5rem] pt-[2.5rem] grid grid-cols-1 min-[640px]:grid-cols-2 min-[960px]:grid-cols-3 max-[960px]:max-w-[616px] min-[961px]:max-w-[916px] w-full m-auto place-items-center">
      {data.map((post) => {
        if ("image" in post) {
          return (
            <BoardItem
              key={"post" + post.id}
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