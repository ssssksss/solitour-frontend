export const NOTICE_DETAIL_BREADCRUMB_PATH = (id: number) => [
  { label: "고객지원", href: "/support" },
  { label: "공지사항", href: "/support?menu=notice" },
  { label: `${id}`, href: "" },
];

export const QNA_DETAIL_BREADCRUMB_PATH = (id: number) => [
  { label: "고객지원", href: "/support" },
  { label: "QnA", href: "/support?menu=qna" },
  { label: `${id}`, href: "" },
];

export const QNA_DETAIL_WRITE_BREADCRUMB_PATH = [
  { label: "고객지원", href: "/support" },
  { label: "QnA", href: "/support?menu=qna" },
  { label: "질문 등록하기", href: "" },
];

export const MYPAGE_PROFILE_BREADCRUMB_PATH = [
  { label: "마이페이지", href: "/mypage?mainCategory=정보&category=owner" },
  { label: "프로필 설정", href: "" },
];

