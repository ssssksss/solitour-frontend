export interface Gathering {
  gatheringId: number;
  title: string;
  zoneCategoryParentName: string;
  zoneCategoryChildName: string;
  viewCount: number;
  isBookMark: boolean;
  likeCount: number;
  gatheringCategoryName: string;
  nickname: string;
  scheduleStartDate: string; // ISO 8601 format
  scheduleEndDate: string; // ISO 8601 format
  deadline: string; // ISO 8601 format
  allowedSex: string | ("ALL" | "MALE" | "FEMALE");
  startAge: number;
  endAge: number;
  personCount: number;
  nowPersonCount: number;
  isLike: boolean;
  gatheringStatus?: "CONSENT" | "REFUSE" | "WAIT";
  isFinish?: boolean;
  openChattingUrl: string;
}

export interface gatheringApplicantsResponse {
  userGatheringResponse: {
    id: number;
    profileUrl: string;
    nickname: string;
    age: number;
    sex: string;
  };
  gatheringStatus: "WAIT" | "CONSENT" | "REFUSE";
}

export interface GatheringDetail {
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
  tagResponses: { name: string }[];
  userPostingResponse: {
    id: number;
    name: string;
    nickname: string;
  };
  placeResponse: {
    searchId: string;
    name: string;
    xaxis: number;
    yaxis: number;
    address: string;
  };
  zoneCategoryResponse: {
    parentZoneCategory: {
      parentZoneCategory: null;
      name: string;
    } | null;
    name: string;
  };
  likeCount: number;
  nowPersonCount: number;
  gatheringApplicantsResponses: gatheringApplicantsResponse[];
  gatheringRecommend: Gathering[];
  isLike: boolean;
  gatheringCategoryResponse: { id: number; name: string };
  gatheringStatus: string;
  openChattingUrl: string;
  userImage: string;
}
