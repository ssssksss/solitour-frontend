"use client";

import MyBookmarkList from "@/components/mypage/MyBookmarkList";

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

const MyBookmarkListContainer = () => {
  return <MyBookmarkList data={data} />;
};

export default MyBookmarkListContainer;
