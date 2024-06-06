`use client`

import MyBoardList from "@/components/mypage/MyBoardList";

interface MyBoardListContainerProps {
    activeBoardMenuIndex: number,
}

    const data: (| {
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
  })[] = [
    {
      id: 1,
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
      tags: ["혼카페", "서촌", "아늑한"],
      },
      {
        id: 2,
        category: "숙박",
        title: "다양한 프로그램이 있는 제주 월정리 게하",
        image: "/PostImage2.svg",
        tags: ["제주 월정리", "1인 게하"],
        },
        {
        id: 3,
      category: "액티비티",
      title: "혼자 놀기 초보도 가능한 국립현대미술관",
      image: "/PostImage3.svg",
      tags: ["미술관", "안국역", "전시"],
    },
            {
                id: 4,
      category: "전시",
      title: "국립현대미술관 같이 가요!",
      userName: "hey000",
      date: "2024.05.31(금)",
      place: "미술관 서울",
      time: "1:00 pm - 3:00 pm",
      joinMember: 1,
      limitMember: 4,
    },
    ];
  
    

const MyBoardListContainer = ({activeBoardMenuIndex}:MyBoardListContainerProps) => {
    return (
        <MyBoardList data={data} />
    )
}

export default MyBoardListContainer