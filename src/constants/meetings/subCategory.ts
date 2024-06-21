type SUBCATEGORY_TYPE = {
  [category: string]: Array<Readonly<{ query: string; buttonText: string }>>;
};

export const SUBCATEGORY: SUBCATEGORY_TYPE = {
  "": [],
  모임: [
    { query: "all", buttonText: "전체" },
    { query: "preference", buttonText: "취향" },
    { query: "activity", buttonText: "활동" },
  ],
};
