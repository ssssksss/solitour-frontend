interface InformationCategory {
  name: string;
  value: string;
}

export const INFORMATION_CATEGORY_LIST: InformationCategory[] = [
  {
    name: "내 게시물",
    value: "owner",
  },
  {
    name: "북마크",
    value: "bookmark",
  },
] as const;
