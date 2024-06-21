type SUBCATEGORY_TYPE = {
  [category: string]: Array<Readonly<{ query: string; buttonText: string }>>;
};

export const SUBCATEGORY: SUBCATEGORY_TYPE = {
  "": [],
  맛집: [
    { query: "all", buttonText: "전체" },
    { query: "cafe", buttonText: "혼카페" },
    { query: "meal", buttonText: "혼밥" },
    { query: "bar", buttonText: "혼술" },
  ],
  숙박: [
    { query: "all", buttonText: "전체" },
    { query: "hotel_pension", buttonText: "호텔/펜션" },
    { query: "guestHouse", buttonText: "게하" },
    { query: "motel", buttonText: "모텔" },
    { query: "home_villa", buttonText: "홈/빌라" },
    { query: "hanok", buttonText: "한옥" },
  ],
  액티비티: [
    { query: "all", buttonText: "전체" },
    { query: "waterLeisure", buttonText: "수상레저" },
    { query: "sights", buttonText: "관광지" },
    { query: "exhibition", buttonText: "전시" },
    { query: "shop", buttonText: "편집/소품샵" },
  ],
};
