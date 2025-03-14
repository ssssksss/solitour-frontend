type ShortcutType = {
  title: string;
  description: string;
  href: string;
  gradient: string;
  imageSrc: string;
  imageAlt: string;
};

export const SHORTCUTS: ShortcutType[] = [
  {
    title: "여행 정보",
    description: "맛집, 숙박, 액티비티",
    href: "/informations/list?page=1&parentCategoryId=1",
    gradient: "from-[#CBF6FF] to-[#EBE0FA]",
    imageSrc: "/icons/information-icon.svg",
    imageAlt: "information-icon",
  },
  {
    title: "모임 정보",
    description: "다양한 테마의 모임",
    href: "/gathering",
    gradient: "from-[#E7FCE0] to-[#C3E9FF]",
    imageSrc: "/icons/gathering-icon.svg",
    imageAlt: "gathering-icon",
  },
] as const;
