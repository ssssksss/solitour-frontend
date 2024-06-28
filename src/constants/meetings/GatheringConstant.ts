export const CATEGORY_MODAL_CATEGORY_LIST: {
  [key: string]: {
    name: string;
    subCategory: {
      [key: string]: string;
    };
  };
} = {
  liking: {
    name: "취향",
    subCategory: {
      취향1: "취향11",
      취향2: "취향22",
      취향3: "취향33",
    },
  },
  activity: {
    name: "활동",
    subCategory: {
      climbing: "클라이밍",
      활동2: "활동22",
      활동3: "활동33",
    },
  },
};


export const SETTING_MODAL_SEX: {[key: string]: string} = {
  all: "전체",
  man: "남성",
  woman: "여성",
};
export const SETTING_MODAL_DAY_OF_THE_WEEK: {[key: string]: string} = {
  0: "일",
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
};

export const SETTING_MODAL_AGE = {
  전체: {
    startAge: 20,
    endAge: 59,
  },
  "20대": {
    startAge: 20,
    endAge: 29,
  },
  "30대": {
    startAge: 30,
    endAge: 39,
  },
  "40대": {
    startAge: 40,
    endAge: 49,
  },
  "50대": {
    startAge: 50,
    endAge: 59,
  },
};
