interface GatheringCategory {
  name: string;
  value: string;
}

export const GATHERING_CATEGORY_LIST: GatheringCategory[] = [
  {
    name: "내가 만든 모임",
    value: "host",
  },
  {
    name: "내가 신청한 모임",
    value: "applicant",
  },
  {
    name: "북마크",
    value: "bookmark",
  },
] as const;
