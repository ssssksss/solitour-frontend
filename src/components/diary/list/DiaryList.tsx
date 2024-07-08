import DiaryCardContainer from "@/containers/diary/list/DiaryCardContainer";
import DiaryWriteButton from "./DiaryWriteButton";
import { DiaryResponseDto } from "@/types/DiaryDto";
import Link from "next/link";

const DiaryList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // TODO
  const data: DiaryResponseDto[] = [
    {
      title: "나 홀로 제주여행",
      period: "2024.06.07-2024.06.10",
      image: "/diary-image1.svg",
      moodLevel: 1,
      description:
        "7월 나 홀로 3박 4일 제주도 여행을 다녀왔다. 제주도는 언제 가도 너무 좋아 자주 와봤는데 혼자 여행은 처음이라 많은 것을 느낀 여행이었다. 해안도로에서 자전거를 탔을 때가 가장 기억이 많이 난다. 날씨도 너무 좋고 바다도 예뻐 혼자 2시간을 목적지 없이 자전거를 탔다. 그리고 솔리투어에서 추천해 준 장소에 방문한 기억도 잊지 못할 것 같다. 맑고 푸른 강과 산, 그리고 하늘 높이 떠 있는 구름들을 보며 문득 예전 기억들이 떠올랐다.",
    },
    {
      title: "나 홀로 제주여행",
      period: "2024.06.07-2024.06.10",
      image: "/diary-image1.svg",
      moodLevel: 1,
      description:
        "7월 나 홀로 3박 4일 제주도 여행을 다녀왔다. 제주도는 언제 가도 너무 좋아 자주 와봤는데 혼자 여행은 처음이라 많은 것을 느낀 여행이었다. 해안도로에서 자전거를 탔을 때가 가장 기억이 많이 난다. 날씨도 너무 좋고 바다도 예뻐 혼자 2시간을 목적지 없이 자전거를 탔다. 그리고 솔리투어에서 추천해 준 장소에 방문한 기억도 잊지 못할 것 같다. 맑고 푸른 강과 산, 그리고 하늘 높이 떠 있는 구름들을 보며 문득 예전 기억들이 떠올랐다.",
    },
    {
      title: "밤하늘 별로 가득했던 강릉 안반데기",
      period: "2024.07.19-2024.07.21",
      image: "/diary-image2.svg",
      moodLevel: 2,
      description:
        "7월 나 홀로 3박 4일 제주도 여행을 다녀왔다. 제주도는 언제 가도 너무 좋아 자주 와봤는데 혼자 여행은 처음이라 많은 것을 느낀 여행이었다. 해안도로에서 자전거를 탔을 때가 가장 기억이 많이 난다. 날씨도 너무 좋고 바다도 예뻐 혼자 2시간을 목적지 없이 자전거를 탔다. 그리고 솔리투어에서 추천해 준 장소에 방문한 기억도 잊지 못할 것 같다. 맑고 푸른 강과 산, 그리고 하늘 높이 떠 있는 구름들을 보며 문득 예전 기억들이 떠올랐다.",
    },
  ];

  return (
    <div className="w-[60rem] max-[1024px]:w-[29.375rem] max-[518px]:w-[calc(100%_-_48px)]">
      <h1 className="py-[2.375rem] text-[1.75rem] font-bold dark:text-slate-200">
        여행 일기
      </h1>
      <div className="flex flex-row justify-end pb-4">
        <Link
          className="flex h-[2.625rem] w-[7.6875rem] items-center justify-center rounded-full bg-black text-white hover:scale-105 dark:bg-slate-600"
          href="/diary/write"
        >
          일기 쓰기
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        <DiaryWriteButton />
        {data.map((value, index) => (
          <DiaryCardContainer key={index} diaryData={value} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
