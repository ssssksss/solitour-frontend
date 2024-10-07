import InformationItemContainer from "@/containers/common/InformationItemContainer";

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
    <div className="m-auto grid w-full grid-cols-1 place-items-center gap-x-[1.25rem] gap-y-[0.875rem] pb-[5rem] pt-[2.5rem] min-[708px]:max-w-[628px] min-[708px]:grid-cols-2 min-[1024px]:max-w-[60.5rem] min-[1024px]:grid-cols-3">
      {data.map((post, index) => {
        if (!("qualification" in post)) {
          return (
            <InformationItemContainer
              key={"post" + post.id}
              informationId={post.id}
              categoryName={post.category}
              isBookMark={true}
              isLike={false}
              title={post.title}
              image={post.image}
              address="테스트 주소"
              likeCount={33}
              viewCount={44}
            />
          );
        } else {
          return (
            // <GatheringItem
            //   key={index}
            //   id={index + 1}
            //   category={post.category}
            //   bookmark={post.bookmark}
            //   title={post.title}
            //   username={post.username}
            //   date={post.date}
            //   location={post.location}
            //   time={post.time}
            //   current={post.current}
            //   total={post.total}
            //   qualification={post.qualification}
            //   likes={post.likes}
            //   views={post.views}
            // />
            <div key={index}> </div>
          );
        }
      })}
    </div>
  );
};

export default MyBookmarkList;
