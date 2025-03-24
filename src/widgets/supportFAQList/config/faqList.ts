interface FAQ {
  topic: string;
  question: string;
  answer: string;
}

export const FAQList: FAQ[] = [
  {
    topic: "여행일기 서비스",
    question: "일기는 다른 사용자가 볼 수 있나요?",
    answer:
      "아니요, 일기는 각각 개인에게만 제공되는 서비스이므로 다른 사용자가 볼 수 없습니다.",
  },
  {
    topic: "회원",
    question: "회원 탈퇴는 어떻게 하나요?",
    answer:
      "우측 상단 프로필 이미지(마이페이지) - 프로필 이미지 우측 하단 설정 아이콘 - 페이지 우측 하단 '회원 탈퇴'를 클릭하시면 됩니다.",
  },
];
