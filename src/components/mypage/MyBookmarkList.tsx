
import InformationItem from '../common/InformationItem';
import MeetingItem from '../common/MeetingItem';
type MyBookmarkListProps = {
  data: (
    | {
        id: number;
        category: string;
        title: string;
        image: string;
      }
    | {
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
      }
  )[];
};

const MyBookmarkList = ({ data }: MyBookmarkListProps) => {
  return (
    <div className="gap-x-[1.25rem] gap-y-[0.875rem] pb-[5rem] pt-[2.5rem] grid grid-cols-1 min-[708px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[708px]:max-w-[628px] min-[1024px]:max-w-[60.5rem] w-full m-auto place-items-center">
      {data.map((post, index) => {
        if (!("qualification" in post)) {
          return (
            <InformationItem
              key={"post" + post.id}
              id={post.id}
              category={post.category}
              title={post.title}
              image={post.image}
            />
          );
        } else {
          return (
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
          );
        }
      })}
    </div>
  );
};

export default MyBookmarkList;