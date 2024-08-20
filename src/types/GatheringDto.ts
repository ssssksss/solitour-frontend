export interface GatheringRequestDto {}

export interface GatheringResponseDto {
  id: number;
  category: string;
  bookmark: boolean;
  title: string;
  username: string;
  date: Date;
  location: string;
  time: string;
  current: number;
  total: number;
  qualification: string;
  likes: number;
  views: number;
  isLike: boolean;
}

export interface TopGatheringResponseDto {
  id: number;
  title: string;
}


// types.ts

type UserPostingResponse = {
  id: number;
  name: string;
};

export type PlaceResponse = {
  searchId: string;
  name: string;
  xaxis: number;
  yaxis: number;
  address: string;
};

type ZoneCategoryResponse = {
  parentZoneCategory: { parentZoneCategory: null | ZoneCategoryResponse; name: string } | null;
  name: string;
};

export type GatheringRecommend = {
  gatheringId: number;
  title: string;
  zoneCategoryParentName: string;
  zoneCategoryChildName: string;
  viewCount: number;
  isBookMark: boolean;
  likeCount: number;
  gatheringCategoryName: string;
  userName: string;
  scheduleStartDate: string;
  scheduleEndDate: string;
  deadline: string;
  allowedSex: string;
  startAge: number;
  endAge: number;
  personCount: number;
  nowPersonCount: number;
  isLike: boolean;
};

// 모임 상세 페이지 타입

export interface GatheringDetailResponseDto {
  title: string;
  content: string;
  personCount: number;
  viewCount: number;
  createdAt: string;
  scheduleStartDate: string;
  scheduleEndDate: string;
  deadline: string;
  isFinish: boolean;
  allowedSex: string;
  startAge: number;
  endAge: number;
  tagResponses: {name: string}[];
  userPostingResponse: UserPostingResponse;
  placeResponse: PlaceResponse;
  zoneCategoryResponse: ZoneCategoryResponse;
  likeCount: number;
  nowPersonCount: number;
  gatheringApplicantsResponses: any[];
  gatheringRecommend: GatheringRecommend[];
  isLike: boolean
};


// 모임 리스트 조회

export interface Gathering {
  gatheringId: number;
  title: string;
  zoneCategoryParentName: string;
  zoneCategoryChildName: string;
  viewCount: number;
  isBookMark: boolean;
  likeCount: number;
  gatheringCategoryName: string;
  userName: string;
  scheduleStartDate: string; // ISO 8601 format
  scheduleEndDate: string; // ISO 8601 format
  deadline: string; // ISO 8601 format
  allowedSex: string;
  startAge: number;
  endAge: number;
  personCount: number;
  nowPersonCount: number;
  isLike: boolean;
}

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface GatheringsResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Gathering[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}