`use client`

import MyBoardList from "@/components/mypage/MyBoardList";

interface MyBoardListContainerProps {
    activeBoardMenuIndex: number,
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
    )[] = [
      {
        id: 1,
        category: "맛집",
        title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
        image: "/PostImage.svg",
      },
      {
        id: 2,
        category: "숙박",
        title: "다양한 프로그램이 있는 제주 월정리 게하",
        image: "/PostImage2.svg",
      },
      {
        id: 3,
        category: "액티비티",
        title: "혼자 놀기 초보도 가능한 국립현대미술관",
        image: "/PostImage3.svg",
      },
      {
        id: 4,
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
    ];
  
    

const MyBoardListContainer = ({activeBoardMenuIndex}:MyBoardListContainerProps) => {
    return (
        <MyBoardList data={data} />
    )
}

export default MyBoardListContainer