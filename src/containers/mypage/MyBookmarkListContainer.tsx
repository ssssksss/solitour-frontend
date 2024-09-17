import MyBookmarkList from "@/components/mypage/MyBookmarkList";

`use client`;

interface MyBookmarkListContainerProps {
  activeBookmarkMenuIndex: number;
}

const data: (
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
)[] = [];

const MyBookmarkListContainer = ({
  activeBookmarkMenuIndex,
}: MyBookmarkListContainerProps) => {
  return <MyBookmarkList data={data} />;
};

export default MyBookmarkListContainer;
